import { Scene } from "phaser";

export interface SceneMapperConfig {
    scene: Scene,
    columns: number,
    rows: number
}

export class ScreenMapper {

    private gridWidth = 0;
    private gridHeight = 0;
    private halfGridWidth = 0;
    private halfGridHeight = 0;
    private screenWidth = 0;
    private screenHeight = 0;

    constructor(private config: SceneMapperConfig) {
        this.screenWidth = config.scene.game.config.width as number;
        this.screenHeight = config.scene.game.config.height as number;
        this.gridWidth = Math.floor(this.screenWidth / this.config.columns);
        this.gridHeight = Math.floor(this.screenHeight / this.config.rows);
        this.halfGridWidth = Math.floor(this.gridWidth / 2);
        this.halfGridHeight = Math.floor(this.gridHeight / 2);
    }

    placeObjectAt(x, y, obj: any) {
        obj.x = (x * this.gridWidth) + this.halfGridWidth;
        obj.y = (y * this.gridHeight) + this.halfGridHeight;
    }

    scaleObject(obj: any, opts: any = {}) {
        if('scaleX' in opts) {
            obj.scaleX = opts.scaleX;
        }

        if('scaleY' in opts) {
            obj.scaleY = opts.scaleY;
        }

        if('scaleToWidth' in opts) {
            obj.displayWidth = Math.floor(this.screenWidth * opts.scaleToWidth);
            obj.scaleY = obj.scaleX;
        }

        if('scaleToHeight' in opts) {
            obj.displayHeight = Math.floor(this.screenHeight * opts.scaleToHeight);
            obj.scaleX = obj.scaleY;
        }
    }

    placeImageAt(x, y, key: any, opts: any) {
        const img = this.config.scene.add.image(0, 0, key);
        this.scaleObject(img, opts);
        this.placeObjectAt(x, y, img);
        return img;
    }

    placeSpriteAt(x, y, key: any, opts: any) {
        const sprite = this.config.scene.add.sprite(0, 0, key);
        this.scaleObject(sprite, opts);
        this.placeObjectAt(x, y, sprite);
        return sprite;
    }

    placeTextAt(x, y, msg: string, opts: any = {}) {
        const text = this.config.scene.add.text(0, 0, msg, {
            fontFamily: 'Mountains of Christmas',
            fontSize: '1.5rem',
            color: '#00ff00'
        });

        this.placeObjectAt(x, y, text);
        return text;
    }

    // helping with object placement
    drawGrids() {
        // get a copy of the graphic object
        const gc = this.config.scene.add.graphics();

        // set the pen characteristics
        gc.lineStyle(2, 0xff0000, 0.5);

        // draw columns
        for(let i = 0; i < this.config.columns; i++) {
            // move the pen to the first location
            gc.moveTo(i * this.gridWidth, 0);
            // draw to the second point
            gc.lineTo(i * this.gridWidth, this.screenHeight);
        }

        // draw rows
        for(let i = 0; i < this.config.rows; i++) {
            gc.moveTo(0, i * this.gridHeight);
            gc.lineTo(this.screenWidth, i * this.gridHeight);
        }

        gc.strokePath();
    }
}