import { Config, Direction, KeyCode, SPRITE_WINDOW } from '../scripts/config.js';
import { Bullet } from '../scripts/bullet.js';

export class Tank {
    constructor(context , image, specs, mode, degree, direction) {
        this.context = context;
        this.image = image;
        this.specs = specs;
        this.direction = direction;
        this.mode = mode;
        this.degree = degree;
        this.startXonCanvas = this.specs[this.direction].startXonCanvas;
        this.startYonCanvas = this.specs[this.direction].startYonCanvas;
        this.bulletList = [];
    }

    draw() {
        let currentDirectionSpecs = this.specs[this.direction];
        let { startXfromSprite, startYfromSprite, cropWidthFromSprite, cropHeightFromSprite, 
              renderWidthonCanvas, renderHeightonCanvas } = currentDirectionSpecs;
        this.context.save();    
        //this.context.rotate(this.degree * Math.PI/360);
        this.context.drawImage( this.image, startXfromSprite * cropWidthFromSprite, startYfromSprite, cropWidthFromSprite, cropHeightFromSprite, 
                                this.startXonCanvas, this.startYonCanvas, renderWidthonCanvas, renderHeightonCanvas );     
        this.context.restore();
        

    }

    fireBullet() {
        let bulletImage = new Image();
        let startXonCanvas,startYonCanvas, renderWidth = 17.5, renderHeight = 7.5, cropWidth = 27, cropHeight = 15;
        let { renderWidthonCanvas, renderHeightonCanvas } = this.specs[this.direction];
        switch(this.direction) {
            case Direction.TOP:
                bulletImage.src = 'assets/images/fire/bullet_top.png';
                startXonCanvas = (this.startXonCanvas + (renderWidthonCanvas/2) - 3);
                startYonCanvas = this.startYonCanvas;
                [renderWidth, renderHeight] = [renderHeight, renderWidth];
                [cropWidth, cropHeight] = [cropHeight, cropWidth];
                break;
            case Direction.BOTTOM:
                bulletImage.src = 'assets/images/fire/bullet_bottom.png';
                startXonCanvas = (this.startXonCanvas + (renderWidthonCanvas/2) -3);
                startYonCanvas = this.startYonCanvas + renderHeightonCanvas;
                [renderWidth, renderHeight] = [renderHeight, renderWidth];
                [cropWidth, cropHeight] = [cropHeight, cropWidth];
                break;
            case Direction.LEFT:
                bulletImage.src = 'assets/images/fire/bullet_left.png';
                startXonCanvas = this.startXonCanvas;
                startYonCanvas = this.startYonCanvas + (renderHeightonCanvas/2) - 3;
                break;
            case Direction.RIGHT:
                bulletImage.src = 'assets/images/fire/bullet_right.png';
                startXonCanvas = this.startXonCanvas + renderWidthonCanvas;
                startYonCanvas = this.startYonCanvas + (renderHeightonCanvas/2) - 3;
                  break;
            default:;
        }
        console.log('Fire : ',renderHeight, renderWidth, cropHeight, cropWidth);
        let bullet = new Bullet(bulletImage,0,0,cropWidth,cropHeight,startXonCanvas, startYonCanvas,renderWidth,renderHeight,this.direction,4,this.context);
        this.bulletList.push(bullet);
    }

    updateBullets() {
        if(this.bulletList) {
            this.bulletList.forEach((bullet, index) => {
                bullet.update();
                bullet.draw();
                if(bullet.startXonCanvas + bullet.renderWidthonCanvas > Config.CANVAS_WIDTH - 40) {
                    this.bulletList.splice(index,1);
                }
            });                
        }            
    }

    update(keyCode) {
        if(Object.values(Direction).includes(keyCode)) {
            this.direction = keyCode;        
            if(this.direction === keyCode) {
                switch(this.direction) {
                    case Direction.TOP:
                        this.startYonCanvas = this.startYonCanvas - this.specs[this.direction].speed;
                        break;
                    case Direction.BOTTOM:
                        this.startYonCanvas = this.startYonCanvas + this.specs[this.direction].speed;
                        break;            
                    case Direction.LEFT:
                        this.startXonCanvas = this.startXonCanvas - this.specs[this.direction].speed;
                        break;            
                    case Direction.RIGHT:
                        this.startXonCanvas = this.startXonCanvas + this.specs[this.direction].speed;            
                        break;                                        
                    default: ;
                }
            }
            if(Object.values(Direction).includes(this.direction)) {
               this.updateSprite();
            }
        }
        if(keyCode === KeyCode.SPACE) {
            this.specs[this.direction].startXfromSprite = SPRITE_WINDOW[this.mode][0];
            this.updateSprite();
        }
    }

    updateSprite() {
        this.specs[this.direction].startXfromSprite++;
        let currSpriteModeWindow = SPRITE_WINDOW[this.mode];
        console.log('Modeee : ', this.mode, this.specs[this.direction].startXfromSprite)
        if(this.specs[this.direction].startXfromSprite > currSpriteModeWindow[1]) {
            this.specs[this.direction].startXfromSprite = currSpriteModeWindow[0];
        }
    }

    setMode(mode) {
        this.mode = mode;
    }

}
