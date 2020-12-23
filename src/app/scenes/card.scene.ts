import { GameObjects, Scene } from 'phaser';
import { ANIMS_BONFIRE, AUDIO_AWAY_IN_A_MANGER, Globals, IMG_ANGEL_GABRIEL, IMG_ANGEL_GABRIEL_BW, IMG_BABY_JESUS, IMG_BACKGROUND, IMG_BONFIRE, IMG_DONKEY, IMG_JOSEPH, IMG_MARY, IMG_MERRY_CHRISTMAS, IMG_SHEPHERDS, IMG_THREE_WISE_MEN, SCENE_CARD } from '../constants';
import { GameService } from '../game.service';
import { ScreenMapper } from './scene-mapper';

export class CardScene extends Scene {

    private gabrielBW: GameObjects.Image;
    private gameServ: GameService;

    constructor() {
        super(SCENE_CARD);

        // lookup GameService (manual injection)
        this.gameServ = Globals.injector.get(GameService);
    }

    // load resources
    preload() {
        // load background
        this.load.image(IMG_BACKGROUND, 'assets/background.png');
        this.load.image(IMG_BABY_JESUS, 'assets/baby_jesus.png');
        this.load.image(IMG_MARY, 'assets/mary.png');
        this.load.image(IMG_JOSEPH, 'assets/joseph.png');
        this.load.image(IMG_THREE_WISE_MEN, 'assets/three_wise_men.png');
        this.load.image(IMG_SHEPHERDS, 'assets/shepherds.png');
        this.load.image(IMG_DONKEY, 'assets/donkey.png');
        this.load.image(IMG_ANGEL_GABRIEL, 'assets/angel_gabriel.png');
        this.load.image(IMG_ANGEL_GABRIEL_BW, 'assets/angel_gabriel_bw.png');
        this.load.image(IMG_MERRY_CHRISTMAS, 'assets/merry_christmas.png');

        this.load.spritesheet(IMG_BONFIRE, 'assets/bonfire.png', {
            frameWidth: 230,
            frameHeight: 312
        });

        this.load.audio(AUDIO_AWAY_IN_A_MANGER, [
            'assets/audio/away_in_a_manger.mp3',
            'assets/audio/away_in_a_manger.ogg'
        ]);
    }

    // create game objects
    create() {
        const mapper = new ScreenMapper({
            scene: this,
            columns: 11,
            rows: 11
        });

        let img = mapper.placeImageAt(5, 5, IMG_BACKGROUND, { scaleX: 1.5, scaleY: 1.5 });

        // mapper.drawGrids();

        img = mapper.placeImageAt(8, 1, IMG_MERRY_CHRISTMAS, { scaleX: 0.3, scaleY: 0.3 });

        img = mapper.placeImageAt(3, 6, IMG_SHEPHERDS, { scaleX: 0.7, scaleY: 0.7 });
        img = mapper.placeImageAt(4, 7, IMG_MARY, { scaleX: 0.5, scaleY: 0.5 });
        img = mapper.placeImageAt(3, 8, IMG_DONKEY, { scaleX: 0.35, scaleY: 0.35 });
        img.x += 20;
        
        img = mapper.placeImageAt(6, 6, IMG_JOSEPH, { scaleX: 0.7, scaleY: 0.7 });
        img.y += 10;
        img = mapper.placeImageAt(7, 6, IMG_THREE_WISE_MEN, { scaleX: 0.7, scaleY: 0.7 });
        img.y += 20;
        
        img = mapper.placeImageAt(5, 8, IMG_BABY_JESUS, { scaleX: 0.3, scaleY: 0.3 });
        
        img = mapper.placeImageAt(5, 4, IMG_ANGEL_GABRIEL, { scaleX: 0.6, scaleY: 0.6 });
        img.x -= 15;
        img.rotation = Phaser.Math.DegToRad(10);
        
        /*
        this.gabrielBW = mapper.placeImageAt(5, 4, IMG_ANGEL_GABRIEL_BW, { scaleX: 0.6, scaleY: 0.6 });
        this.gabrielBW.x -= 15;
        this.gabrielBW.rotation = Phaser.Math.DegToRad(10);
        this.gabrielBW.setInteractive();
        this.gabrielBW.on('pointerover', () => {
            // this.gabrielBW.alpha = 1;
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500,
                // attributes
                alpha: 0
            })
        });
        this.gabrielBW.on('pointerout', () => {
            // this.gabrielBW.alpha = 1;
            this.add.tween({
                targets: this.gabrielBW,
                duration: 500,
                // attributes
                alpha: 1
            })
        });
        */

        this.anims.create({
            key: ANIMS_BONFIRE,
            frames: this.anims.generateFrameNumbers(IMG_BONFIRE, { start: 0 }),
            frameRate: 8,
            repeat: -1
        });

        let sprite = mapper.placeSpriteAt(9, 8, IMG_BONFIRE, {  scaleX: 0.6, scaleY: 0.6 });
        sprite.x -= 10;
        sprite.y += 15;
        sprite.play(ANIMS_BONFIRE);

        const music = this.sound.add(AUDIO_AWAY_IN_A_MANGER, {
            volume: 0.25,
            loop: true
        });
        music.play();

        let text = mapper.placeTextAt(0, 10, this.gameServ.message);
        text.x -= 30;

        /*
        const centerX = this.game.config.width as number / 2;
        const centerY = this.game.config.height as number / 2;

        const bkg = this.add.image(centerX, centerY, IMG_BACKGROUND);
        // bkg.scaleX = 0.5;
        // bkg.scaleY = 0.5;
        // bkg.rotation = Phaser.Math.DegToRad(45);
        // bkg.setOrigin(0, 0);
        */
    }

    // load game
    update() {

    }

}