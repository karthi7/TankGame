
export class Platform {
    constructor(tiles, backgrounds) {
        this.tiles = tiles;
        this.backgrounds = backgrounds ? backgrounds : null;
    }
    draw() {
        this.tiles?.forEach(tile => {
            tile?.draw();
        });
        this.backgrounds?.forEach(background => {
            background?.draw();
        });
    }
    update() {
        this.tiles?.forEach(tile => {
            tile?.update();
        });
        this.backgrounds?.forEach(background => {
           // background?.update();
        });
    }
}
