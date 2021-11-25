import { Tank } from './scripts/tank.js';
import { Tile } from './scripts/tile.js';
import { Platform } from './scripts/platform.js';
import { Config, TANK_SPECS, Direction, TANK_MODE, KeyCode,  Degree, TilesConfiguration, contextPath } from './scripts/config.js';
import { UserAction } from './scripts/utils.js';

let canvas, context, game;
let heroConfig = {
        animationCounter : 0,
        targetAnimationCounter : 12,
        showAnimationForSomeTime: false
    };

class Game {
    constructor(platform, heroTank, tankList) {
       this.platform = platform;
       this.heroTank = heroTank;
       this.tankList = tankList;
    }
    draw() {
        this.platform.draw();
    }

    update() {
        this.platform.update(); 
    }
}


function initGame() {

    let heroTankImage = new Image();
    heroTankImage.src = 'assets/images/character/hero_tank_sprite8.png';
    let heroTank = new Tank(context, heroTankImage, JSON.parse(JSON.stringify(TANK_SPECS)), TANK_MODE.MOVE, Degree.ZERO, Direction.TOP);
    
    let tankImage = new Image();
    tankImage.src = 'assets/images/character/hero_tank_sprite.png';
    let tankList = [new Tank(context, tankImage, JSON.parse(JSON.stringify(TANK_SPECS)), TANK_MODE.MOVE, Degree.ZERO, Direction.RIGHT)];

    let tilesList = [];
    let tileImage = new Image();
    tileImage.src = 'assets/images/floor/bricks/bricks_b.png';

    TilesConfiguration.forEach(data => {
        let { image, startXfromSprite,startYfromSprite,cropWidthFromSprite,cropHeightFromSprite,
            startXonCanvas,startYonCanvas,renderWidthonCanvas,renderHeightonCanvas, isFragile, speed }  = data.CONFIG;
        if(typeof startXonCanvas === 'function') {
            startXonCanvas = data.getstartXonCanvas();
        }
        if(typeof startYonCanvas === 'function') {
            startYonCanvas = data.getstartYonCanvas();
        }
        for(let itr = 0; itr<data.LOOP_COUNT;itr++) {
            let tileImage = new Image();
            tileImage.src = contextPath+image;
            tilesList.push(new Tile(tileImage, startXfromSprite, startYfromSprite, cropWidthFromSprite, cropHeightFromSprite, 
                                    startXonCanvas, startYonCanvas, renderWidthonCanvas, renderHeightonCanvas,isFragile,speed, context));    
            if(data.MULTPLE_ITEM) {
                (data.DIRECTION === 'H' ? (startXonCanvas = startXonCanvas+renderWidthonCanvas) : (startYonCanvas=startYonCanvas+renderHeightonCanvas));
            }
        }
    });

    // for(let itr = 0; itr<26; itr++) {
    //     tilesList.push(new Tile(tileImage, 0, 0, 100, 100, itr*75, canvas.height-75, 75, 75,true,Config.SPEED, context));
    // }
    // for(let itr = 0; itr<26; itr++) {
    //     tilesList.push(new Tile(tileImage, 0, 0, 100, 100, itr*75, 0, 75, 75,true,Config.SPEED, context));
    // }
    // for(let itr = 1; itr<14; itr++) {
    //     tilesList.push(new Tile(tileImage, 0, 10, 100, 100, 0, itr*75, 75, 75,true,Config.SPEED, context));
    // }
    // for(let itr = 1; itr<14; itr++) {
    //     tilesList.push(new Tile(tileImage, 0, 10, 100, 100, canvas.width-75, itr*75, 75, 75,true,Config.SPEED, context));
    // }


    let backgroundList = [];

    let backgroundImage = new Image();
    backgroundImage.src = 'assets/images/ground/Ground_06.png';
    
    //  for(let itrI = 75; itrI<=1770; itrI+=70) {
    //      for(let itrJ = 75; itrJ<=930; itrJ+=70) {
    //          backgroundList.push(new Background(backgroundImage, 50, 50, 117, 72, itrI, itrJ, 100, 100,false,Config.SPEED, context));
    //      }
    //  } 
 
    let platForm = new Platform(tilesList, backgroundList);

    game = new Game(platForm, heroTank, tankList);
    runGame();
}


function setDimenstions() {
    canvas.height = Config.CANVAS_HEIGHT;
    canvas.width = Config.CANVAS_WIDTH;
}

function clearWindow() {
    context.clearRect(0,0,Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
}

function runGame() {
    clearWindow();
    game.draw();
    game.update();
    handleHeroMovement();
    handleHeroBullets();
    requestAnimationFrame(runGame);
}

function handleHeroBullets() {
    game.heroTank.updateBullets();
}

function handleHeroMovement() {
    game.heroTank.draw();
    if(heroConfig.showAnimationForSomeTime && [TANK_MODE.FIRE, TANK_MODE.BURST].includes(game.heroTank.mode)) {
        game.heroTank.updateSprite();
        heroConfig.animationCounter++;
        if(heroConfig.animationCounter >= heroConfig.targetAnimationCounter) {
            heroConfig.showAnimationForSomeTime = false;
            heroConfig.animationCounter = 0;
            game.heroTank.setMode(TANK_MODE.MOVE);
        }
    }
}

function handleHeroDirection(keyCode) {
    if(keyCode === KeyCode.SPACE) {
        game.heroTank.fireBullet();
        game.heroTank.setMode(TANK_MODE.FIRE);
        heroConfig.showAnimationForSomeTime = true;
        game.heroTank.update(KeyCode.SPACE);
    }
    else {
        game.heroTank.degree++;
        game.heroTank.update(keyCode);
    }
}

window.addEventListener('load', (event) => {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    setDimenstions();
    initGame();

});

window.addEventListener('keydown', (event) => {
    UserAction.notifyAll(event.which); /**Notify user key action to all subscribers */
    game.update();
    handleHeroDirection(event.which);
});













