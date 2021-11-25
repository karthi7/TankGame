export const Config = {
    SPEED : 2,
    CANVAS_WIDTH : 1920,
    CANVAS_HEIGHT : 1080,
}

export const Direction = {
    TOP : 38,
    BOTTOM : 40,
    LEFT : 37,
    RIGHT : 39
}

export const KeyCode = {
    UP : 38,
    DOWN : 40,
    LEFT : 37,
    RIGHT : 39,
    SPACE : 32
}

export const Degree = {
    ZERO:0
}

export const TANK_SPECS = {
    [Direction.BOTTOM]: {
        startXfromSprite:0,
        startYfromSprite:304,
        cropWidthFromSprite:152,
        cropHeightFromSprite:206,
        startXonCanvas:75,
        startYonCanvas:75,
        renderWidthonCanvas:75,
        renderHeightonCanvas:85,
        speed:5
    },
    [Direction.TOP]: {
        startXfromSprite:0,
        startYfromSprite:510,
        cropWidthFromSprite:152,
        cropHeightFromSprite:206,
        startXonCanvas:75,
        startYonCanvas:75,
        renderWidthonCanvas:75,
        renderHeightonCanvas:85,
        speed:5
    },
    [Direction.RIGHT]: {
        startXfromSprite:0,
        startYfromSprite:152,
        cropWidthFromSprite:206,
        cropHeightFromSprite:152,
        startXonCanvas:75,
        startYonCanvas:75,
        renderWidthonCanvas:85,
        renderHeightonCanvas:75,
        speed:5
    },
    [Direction.LEFT]: {
        startXfromSprite:0,
        startYfromSprite:0,
        cropWidthFromSprite:206,
        cropHeightFromSprite:152,
        startXonCanvas:75,
        startYonCanvas:75,
        renderWidthonCanvas:85,
        renderHeightonCanvas:75,
        speed:5
    }
}

export const TANK_MODE = {
    MOVE : 'MOVE',
    BURST: 'BURST',
    FIRE: 'FIRE'
}

export const SPRITE_WINDOW = {
    MOVE: [0,20],
    BURST:[39,47],
    FIRE:[21,25]
}

export const PLAYER_TYPE = {
    HERO : 'HERO',
    VILLIAN : 'VILLIAN'
}

export const TilesConfiguration = [
    {
        LOOP_COUNT:39,
        DIRECTION: 'H',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'floor/bricks/bricks_b.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:100,
            cropHeightFromSprite:100,
            startXonCanvas:0,
            startYonCanvas:0,
            renderWidthonCanvas:50,
            renderHeightonCanvas:50,
            isFragile: false,
            speed:3
        }
    },
    {
        LOOP_COUNT:20,
        DIRECTION: 'V',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'floor/bricks/bricks_b_v.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:100,
            cropHeightFromSprite:100,
            startXonCanvas: _ => {},
            startYonCanvas:50,
            renderWidthonCanvas:50,
            renderHeightonCanvas:50,
            isFragile: false,
            speed:3
        },
        getstartXonCanvas() {
            return canvas.width-50;
        },
    },
    {
        LOOP_COUNT:20,
        DIRECTION: 'V',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'floor/bricks/bricks_b_v.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:100,
            cropHeightFromSprite:100,
            startXonCanvas:0,
            startYonCanvas:50,
            renderWidthonCanvas:50,
            renderHeightonCanvas:50,
            isFragile: false,
            speed:3
        }
    },
    {
        LOOP_COUNT:39,
        DIRECTION: 'H',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'floor/bricks/bricks_b.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:100,
            cropHeightFromSprite:100,
            startXonCanvas:0,
            startYonCanvas: _ => {},
            renderWidthonCanvas:50,
            renderHeightonCanvas:50,
            isFragile: false,
            speed:3
        },
        getstartYonCanvas() {
            return canvas.height-50;
        },
    },

    {
        LOOP_COUNT:4,
        DIRECTION: 'H',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'decor_tiles/Pillar_01.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:100,
            cropHeightFromSprite:100,
            startXonCanvas: _ => {},
            startYonCanvas: _ => {},
            renderWidthonCanvas:50,
            renderHeightonCanvas:50,
            isFragile: false,
            speed:3
        },
        getstartXonCanvas() {
            return canvas.width/2 - 100;
        },
        getstartYonCanvas() {
            return canvas.height-125;
        },
    },
    {
        LOOP_COUNT:2,
        DIRECTION: 'V',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'floor/Pillar_02.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:64,
            cropHeightFromSprite:120,
            startXonCanvas: _ => {},
            startYonCanvas: _ => {},
            renderWidthonCanvas:30,
            renderHeightonCanvas:25,
            isFragile: false,
            speed:3
        },
        getstartXonCanvas() {
            return canvas.width/2 - 107;
        },
        getstartYonCanvas() {
            return canvas.height-100;
        },
    },
    {
        LOOP_COUNT:2,
        DIRECTION: 'V',
        MULTPLE_ITEM: true,
        CONFIG: {
            image:'floor/Pillar_02.png',
            startXfromSprite:0,
            startYfromSprite:0,
            cropWidthFromSprite:64,
            cropHeightFromSprite:120,
            startXonCanvas: _ => {},
            startYonCanvas: _ => {},
            renderWidthonCanvas:30,
            renderHeightonCanvas:25,
            isFragile: false,
            speed:3
        },
        getstartXonCanvas() {
            return canvas.width/2 + 77;
        },
        getstartYonCanvas() {
            return canvas.height-100;
        },
    }
          
]

export const contextPath = 'assets/images/';
