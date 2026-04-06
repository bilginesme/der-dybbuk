import * as Phaser from 'phaser';
import { DTC } from 'src/app/DTC';

export default class PreloaderScene extends Phaser.Scene {
    private dtc:DTC = new DTC();

    constructor() {
        super('PreloaderScene');
    }

    preload() {
        // 1. Setup the Visual Loading Bar
        // (Optional: Create a simple rectangle graphic)
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // 2. Listen for Loader Events
        this.load.on('progress', (value: number) => {
            // value is 0.0 to 1.0
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            
            //this.scene.start('SettingsScene');  // Start the Menu
            this.scene.start('GameScene', { levelId: 1 });
            //this.scene.start('MenuScene');  // Start the Menu
            //this.scene.start('GameOverScene', { score: 13400, result: false });
            //this.scene.start('SuccessScene', { score: 13400, result: true, levelId:1 });
        });

        const font = new FontFace(this.dtc.strFontFamily, 'url(assets/fonts/PlaypenSans.ttf)');
        font.load().then(() => {
            (document.fonts as any).add(font);
        }).catch(err => {
            console.error('Font failed to load:', err);
        });
    
        this.load.image('bg', 'assets/images/bg.png');
        this.load.image('brick-bg', 'assets/images/brick-bg.png');
        this.load.image('lamp', 'assets/images/lamp.png');

        this.load.image('scenery-01', 'assets/images/upper-part/scenery-01.png');
        
        this.load.image('board-frame', 'assets/images/board/board-frame.png');
        this.load.image('template', 'assets/images/board/level-01-template.png');     // for world creation
        this.load.image('corner-left', 'assets/images/board/corner-left.png');
        this.load.image('corner-right', 'assets/images/board/corner-right.png');
        this.load.image('gem-green', 'assets/images/board/gem-green.png');
        this.load.image('gem-red', 'assets/images/board/gem-red.png');
        this.load.image('skull', 'assets/images/board/skull.png');
        this.load.image('pawn', 'assets/images/board/pawn.png');
        this.load.spritesheet('stones-atlas', 'assets/images/board/stones-atlas.png', { frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('items-atlas', 'assets/images/board/items-atlas.png', { frameWidth: 256, frameHeight: 256 });

        this.load.image('playcards-bg', 'assets/images/playcards/playcards-bg.png');
        this.load.image('playcard-back', 'assets/images/playcards/playcard-back.png');
        this.load.image('playcard-front', 'assets/images/playcards/playcard-front.png');

        this.load.spritesheet('dice-atlas', 'assets/images/playcards/dice-atlas.png', { frameWidth: 500, frameHeight: 500 });
        
        this.load.image('slider_fill', 'assets/images/ui/slider_fill.png');
        this.load.image('slider_knob', 'assets/images/ui/slider_knob.png');
        this.load.image('slider_bg', 'assets/images/ui/slider_bg.png');

        this.load.image('button-green-normal', 'assets/images/ui/button-green-normal.png');        
        this.load.image('button-green-pressed', 'assets/images/ui/button-green-pressed.png');        

        for(let i:number=1; i <= 121; i++) {
            let suffix:string = this.dtc.tripleDigit(i);
            this.load.image('cloud-' + suffix, 'assets/images/clouds/cloud-' + suffix  + '.png');
        }

        for(let i:number=1; i <= 5; i++) {
            let suffix:string = this.dtc.doubleDigit(i);
            this.load.image('mist-' + suffix, 'assets/images/mist/mist-' + suffix  + '.png');
        }

        this.load.spritesheet('moon', 'assets/images/moon-phases.png', { frameWidth: 800, frameHeight: 800 });

        this.load.audio('background-01', 'assets/sounds/background-01.mp3');
        this.load.audio('background-02', 'assets/sounds/background-02.mp3');
        this.load.audio('background-03', 'assets/sounds/background-03.mp3');

        this.load.audio('tick', 'assets/sounds/tick.mp3');
        this.load.audio('soundDice', 'assets/sounds/dice.mp3');
        this.load.audio('level-complete', 'assets/sounds/level-complete.mp3');
        this.load.audio('game-over', 'assets/sounds/game-over.mp3');
        this.load.audio('collect-key', 'assets/sounds/collect-key.mp3');
        this.load.audio('bats', 'assets/sounds/bats.mp3');
        this.load.audio('item-good', 'assets/sounds/item-good.mp3');
        this.load.audio('stone-slide', 'assets/sounds/stone-slide.mp3');
    }
}