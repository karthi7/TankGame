
import { Config, Direction } from '../scripts/config.js';

export class Bullet {
    constructor(image, startXfromSprite, startYfromSprite, cropWidthFromSprite, cropHeightFromSprite, startXonCanvas, startYonCanvas, renderWidthonCanvas, renderHeightonCanvas, direction, speed, context) {
        this.image = image;
        this.startXfromSprite = startXfromSprite;
        this.startYfromSprite = startYfromSprite;
        this.cropWidthFromSprite = cropWidthFromSprite;
        this.cropHeightFromSprite = cropHeightFromSprite;
        this.startXonCanvas = startXonCanvas;
        this.startYonCanvas = startYonCanvas;
        this.renderWidthonCanvas = renderWidthonCanvas;
        this.renderHeightonCanvas = renderHeightonCanvas;
        this.direction = direction;
        this.speed = speed;
        this.ctx = context;
    }
  
    draw() {
        this.ctx.drawImage(this.image, this.startXfromSprite, this.startYfromSprite, this.cropWidthFromSprite, this.cropHeightFromSprite , this.startXonCanvas, this.startYonCanvas, this.renderWidthonCanvas, this.renderHeightonCanvas);
    }
    update() {
        switch(this.direction) {
            case Direction.TOP:
                this.startYonCanvas = this.startYonCanvas - this.speed;
                break;
            case Direction.BOTTOM:
                this.startYonCanvas = this.startYonCanvas + this.speed;
                break;
            case Direction.LEFT:
                this.startXonCanvas = this.startXonCanvas - this.speed;
                break;
            case Direction.RIGHT:
                this.startXonCanvas = this.startXonCanvas + this.speed;
                  break;
            default:;
        }
    }
}