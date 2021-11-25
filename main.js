let canvas;
let ctx;

initializePlayGround = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 600;
    images = {};
    images.player = new Image();
    images.player.src = 'assets/images/character/hero.png';

    playerWidth = '110';
    playerHeight = '100';
    playerFrameX = 3;
    playerFrameY = 3;
    playerX = 0;
    playerY = 0;
    playerSpeed = 2;
}

drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

animate = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawSprite(images.player, playerWidth*playerFrameX, playerHeight*playerFrameY, playerWidth, playerHeight, playerX, playerY, playerWidth, playerHeight);

    if(playerFrameX < 13)
        playerFrameX++;
    else
        playerFrameX = 3;


    if(playerX > (+canvas.width + +playerWidth)) {
        console.log('t')
        playerX = 0 - playerWidth;
    }        
    else {
        console.log('f')
        playerX += playerSpeed;
    }
        
        

    

}

window.addEventListener('load', (event) => {
    initializePlayGround();
    animate();
    //window.onload = setInterval(animate, 1000/30);
});




const DIMENSION = {
    SMALL : {
        width: 100,
        height: 100
    }
}

const SPEED = 2;


class Game {
    constructor(platform,enemyList) {
        console.log('Platform : ', platform instanceof Platform)
        this.platform = platform;
        this.enemyList = enemyList;
    }
    draw() {
        this.platform.draw();
        this.enemyList.forEach(enemy => {
            enemy.draw();
        });
    }

    update() {
        this.enemyList.forEach(enemy => {
            enemy.update();
        });
        this.platform.update(); 
    }
}

class Platform {
    constructor(tiles) {
        this.tiles = tiles;
    }
    draw() {
        this.tiles.forEach(tile => {
            tile.draw();
        });
    }
    update() {
        this.tiles.forEach(tile => {
            tile.update();
        });
    }
}

class Bullet {
    constructor(image, x, y, canvasWidth, canvasHeight, canvasX, canvasY, width, height, speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.speed = speed;
    }
    draw() {
        ctx.drawImage(this.image, this.x*this.canvasWidth, this.y*this.canvasHeight, this.canvasWidth, this.canvasHeight , this.canvasX, this.canvasY, this.width, this.height);
        this.update();
    }
    update() {
        this.x++;           
        if(this.x > 7) {
            this.x = 0;
        }
        if(this.canvasX < CANVAS_WIDTH) {
            this.canvasX = this.canvasX + this.speed;
        }
    }
}

class Tile { 
    constructor(image, x, y, canvasWidth, canvasHeight, canvasX, canvasY, width, height, isFragile, speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasX = canvasX;
        this.canvasY = canvasY;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.isFragile = isFragile;
        this.speed = speed;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.canvasWidth, this.canvasHeight , this.canvasX, this.canvasY, this.width, this.height);
    }

    update() {
        console.log('AAA')
        this.canvasX = this.canvasX-this.speed;
    }

}



class Enemy {
    constructor(x,y,width,height, image, speed) {
        this.image = image;
        this.xCordinate = x;
        this.yCordinate = y;
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = canvas.height-200;
        this.speed = speed;           
    }

    draw() {
        ctx.drawImage(this.image, this.xCordinate * this.width, this.yCordinate, this.width, this.height, this.x, this.y, DIMENSION.SMALL.width, DIMENSION.SMALL.height);
        if(this.bulletList) {
            this.bulletList.forEach(bullet => {
                bullet.draw();
            });                
        }            
    }
    update() {
        this.xCordinate++;
        this.x = this.x + this.speed;
        if(this.xCordinate > 3) {
            this.xCordinate = 0;
        }
        if(this.x > CANVAS_WIDTH) {
            this.x = 0;
        }
    }
}


function clearWindow() {
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
}

function runGame() {
    clearWindow();
    game.draw();
    requestAnimationFrame(runGame);
}

function initGame() {
    let enemyImage = new Image();
    enemyImage.src = 'assets/images/character/tank_right.png';
    //let enemyList = [new Enemy(0,0,1421,1203,enemyImage,2)];
    let enemyList = [new Enemy(0,0,205,125,enemyImage,5)];


    let tilesList = [];
    for(let itr = 0; itr<25; itr++) {
        let tileImage = new Image();
        tileImage.src = 'assets/images/ground/Ground_02.png';
        tilesList.push(new Tile(tileImage, 0, 0, 128, 128, itr*50, canvas.height-75, 50,75,true,SPEED));
    }

    for(let itr = 0; itr<50; itr++) {
        let tileImage = new Image();
        let rockIndex = Math.ceil(Math.random() * 6);
        tileImage.src = `assets/images/environment/Rock_0${rockIndex}.png`;
      
        switch(rockIndex) {
            case 1:
            case 2:
                tilesList.push(new Tile(tileImage, 0, 0, 128, 128, (itr*75), canvas.height-50, 50,50,true,SPEED));
                break;
            case 3:
            case 4:
                tilesList.push(new Tile(tileImage, 0, 0, 128, 64, (itr*75), canvas.height-50, 50,50,true,SPEED));
                break;
            case 5:
            case 6:
                tilesList.push(new Tile(tileImage, 0, 0, 64, 64, (itr*75), canvas.height-50, 50,50,true,SPEED));
                break;                    
        }

        

    }

   /* for(let itr = 0; itr<5; itr++) {
        let tileImage = new Image();
        tileImage.src = 'assets/images/floor/Roof_B_02.png';
        tilesList.push(new Tile(tileImage, 0, 0, 320, 160, itr*100, canvas.height-100, 100,50,true,SPEED));
    }*/

    let platForm = new Platform(tilesList);

    game = new Game(platForm, enemyList);
    runGame();
}


window.addEventListener('load', (event) => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    CANVAS_WIDTH = 1200;
    CANVAS_HEIGHT = 1200;
    canvas.height = CANVAS_WIDTH;
    canvas.width = CANVAS_HEIGHT;
   
    initGame();

});

window.addEventListener('keydown', (event) => {
    switch(event.which) {
        case 32:
            let bulletImaege = new Image();
            bulletImaege.src = 'assets/images/fire/fire_sprite.png';
            let bullet = new Bullet(bulletImaege,0,0,52.5,48,(game.enemyList[0].x + game.enemyList[0].width - 50), game.enemyList[0].y+50,50,50,SPEED);
            if(!game.enemyList[0].bulletList) {
                game.enemyList[0].bulletList = [];
            }
            game.enemyList[0].bulletList.push(bullet);
            //game.enemyList[0].bullet.draw();
            break;
    }
    game.update();
});



