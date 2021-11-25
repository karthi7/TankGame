import { Config } from "./config.js";

export class Background { 
    constructor(image, startXfromSprite, startYfromSprite, cropWidthFromSprite, cropHeightFromSprite, startXonCanvas, startYonCanvas, renderWidthonCanvas, renderHeightonCanvas, isFragile, speed, context) {
        this.image = image;
        this.startXfromSprite = startXfromSprite;
        this.startYfromSprite = startYfromSprite;
        this.cropWidthFromSprite = cropWidthFromSprite;
        this.cropHeightFromSprite = cropHeightFromSprite;
        this.startXonCanvas = startXonCanvas;
        this.startYonCanvas = startYonCanvas;
        this.renderWidthonCanvas = renderWidthonCanvas;
        this.renderHeightonCanvas = renderHeightonCanvas;
        this.isFragile = isFragile;
        this.speed = speed;
        this.ctx = context;
    }

    draw() {
        this.ctx.drawImage(this.image, this.startXfromSprite, this.startYfromSprite, this.cropWidthFromSprite, this.cropHeightFromSprite , this.startXonCanvas, this.startYonCanvas, this.renderWidthonCanvas, this.renderHeightonCanvas);
    }

    update() {
        console.log('AAA')
        this.startXonCanvas = this.startXonCanvas+this.speed;

        if(this.startXonCanvas > Config.CANVAS_WIDTH) {
            this.startXonCanvas = 0;
        }
    }

}