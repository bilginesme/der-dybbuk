import Phaser from 'phaser';
import { TranslateService } from '@ngx-translate/core';
import { DTC } from '../../DTC';
import { AudioManager } from '../managers/AudioManager';
import { LevelManager } from '../managers/LevelManager';
import { LEVEL_MANIFEST, LevelData, ObjectiveSlot } from '../types/LevelConfig';
import UpperPart from '../containers/UpperPart';
import Board from '../containers/Board';
import PlayCards from '../containers/Playcards';
import { PossessionManager } from '../managers/PossessionManager';
import { ItemData, ItemNature } from '../types/ItemConfig';
import ScoreBoard from '../containers/Scoreboard';

export class GameScene extends Phaser.Scene {
    private translate!: TranslateService;
    private dtc:DTC = new DTC();
    public audioManager!: AudioManager; 
    private upperPart!:UpperPart;
    private board!:Board;
    private playCards!:PlayCards;
    private scoreBoard!:ScoreBoard;
    private levelManager!: LevelManager;
    private currentLevelId: number = 1; // Default
    private possessionManager!:PossessionManager;
    
    init(data: { levelId: number }) {       // 1. RECEIVE LEVEL ID FROM MENU
        this.currentLevelId = data.levelId || 1;
    }

    constructor() { super('GameScene'); }

    preload() {}

    create() {
        console.log('Starting LEVEL ' + this.currentLevelId);

        this.translate = this.registry.get('translateService'); 
        this.cameras.main.setBackgroundColor('#FFFFFF'); // for visibility
        this.input.addPointer(3);
        
        this.audioManager = this.registry.get('audioManager') as AudioManager;
        // 2. DEBUG FAIL-SAFE: If it doesn't exist (because you bypassed Menu), create it!
        if (!this.audioManager) {
            console.warn("Debug Mode: AudioManager not found in registry. Creating a new instance.");
            this.audioManager = new AudioManager(this);
            this.registry.set('audioManager', this.audioManager);
        } else {
            // Normal path: Just update the scene context
            console.log("Reusing existing AudioManager.");
        }

        this.events.once('shutdown', () => { this.audioManager.stopMusic(); });     // THE FIX: Cleanup when scene restarts/stops
        const variations = ['background-01', 'background-02', 'background-03'];
        this.audioManager.playMusicPlaylist(variations, 120000); // Swap every 2 mins

        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0).setDepth(-20);
        bg.setDisplaySize(this.scale.width, this.scale.height);
        bg.setDisplayOrigin(0, 0);

        this.upperPart = new UpperPart(this, 0, 0);
        this.board = new Board(this, 0, 300);
        this.board.on('pawn-movement-complete', (item:ItemData) => {
            this.possessionManager.updateScore(item.possessionImpact);
            this.scoreBoard.updateScore(this.possessionManager.state.score);
            if(item.nature == ItemNature.GOOD || item.nature == ItemNature.HEALER) {
                this.playCards.openOneRandomCard();
            }
        });
        this.board.on('restart-game', () => {
            console.log('Restart game...');
            this.restartGame();
        });
        this.board.on('test-action-from-board', () => {
            this.upperPart.newItemAcquired('key');
        });

        this.playCards = new PlayCards(this, 0, 2386, this.audioManager);
        this.playCards.on('dice-roll', (diceResult:number) => {
            this.board.playTheDice(diceResult);
        });

        this.levelManager = new LevelManager(this, this.currentLevelId);
        this.levelManager.start();
        
        this.possessionManager = new PossessionManager();

        this.scoreBoard = new ScoreBoard(this, this.board.x + 350, this.board.y + 500);
        this.scoreBoard.updateScore(this.possessionManager.state.score);

        let level:LevelData = LEVEL_MANIFEST.find(l => l.id === this.currentLevelId) || LEVEL_MANIFEST[0];
        this.scoreBoard.updateLevel(level);

        this.createAnims();
        this.createUI();
        this.developmentTools();
    }

    private developmentTools(): void {
        
        // Setup Keyboard Input (Development Helper)
        // The event is 'keydown-SPACE'. It fires once per press (no rapid-fire machine gun if held down).
        /*
        this.input.keyboard?.on('keydown-SPACE', () => { this.shootWeapon();  });
        
        let code:any = Phaser.Input.Keyboard.KeyCodes.ONE;
        this.input.keyboard?.on('keydown-ONE', () => { this.switchWeapon();  });
        this.input.keyboard?.on('keydown-TWO', () => { this.switchWeapon();  });
        this.input.keyboard?.on('keydown-THREE', () => { this.switchWeapon();  });
        */

        // DEVELOPMENT
        // Needed for mouse locations for creating another board
        
        /*
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            let x:number =parseInt(pointer.x.toString());
            let y:number =parseInt(pointer.y.toString());
            console.log(`Screen X: ${x}, Screen Y: ${y}`);
        });
        */

        /*
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            // This translates the pointer's world position into the board's local space
            const localPoint = new Phaser.Math.Vector2();
            this.board.getLocalPoint(pointer.x, pointer.y, localPoint);

            let x = Math.round(localPoint.x);
            let y = Math.round(localPoint.y);

            console.log(`Local X: ${x}, Local Y: ${y} (Relative to Board Container)`);
        });
        */
    }

    override update(time: number, delta: number) {
        
    }

    private restartGame(): void {
        this.scene.restart({ levelId: this.currentLevelId });
    }

    private createUI(): void {
    }

    private createAnims() {

    }
 
    private callBack() {}

    private endGame(victory: boolean) {
        //this.scoreboard.stopTimer(); // Stop the clock!
        this.scene.start('GameOverScene', {
            score: this.possessionManager.state.score, 
            result: victory 
        });
    }

    public showFloatingText(startX:number, startY:number, txtValue:string, txtColor:string) {
        // Start Position: Near the Love Bar 
        // (Assuming Love Bar is Top-Left or Top-Center. Adjust these coords!)

        // 2. Create the Text
        const text = this.add.text(startX, startY, txtValue, {
            fontFamily: this.dtc.strFontFamily, 
            fontSize: '150px',
            fontStyle: 'bold',
            color: txtColor, 
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5).setScrollFactor(0); // Stick to camera (UI layer)

        // The "Sway" Animation
        // We want it to drift towards the center but slightly irregularly
        const targetX = this.scale.width / 2;
        const targetY = this.scale.height / 2;

        this.tweens.add({
            targets: text,
            
            // MOVEMENT: Move to center
            x: targetX,
            y: targetY,
            
            // ROTATION: Give it a slight spin as it falls (looks like debris)
            angle: { from: 0, to: Phaser.Math.Between(-20, 20) },
            
            // FADE: Visible at first, ghost at the end
            alpha: { from: 1, to: 0 },
            
            // SCALE: Shrink slightly as it goes away
            scale: { from: 1.5, to: 0.5 },
            
            duration: 1500, // 1.5 seconds flight time
            ease: 'Quad.easeIn', // Start slow, accelerate into the void
            
            onComplete: () => {
                text.destroy();
            }
        });
    }

    public updateScore(amount:number) {
        this.possessionManager.updateScore(amount);
        this.scoreBoard.updateScore(this.possessionManager.state.score);
    }

    public isPossessedNow():boolean {
        return this.possessionManager.isPossessedNow();
    }

    public getCurrentLevelID():number {
        return this.currentLevelId;
    }

    public nextLevel():void {
        this.currentLevelId++;
        if(this.currentLevelId > LEVEL_MANIFEST.length) {
            console.log('This world is complete. CONGRATS');
            if(confirm('This world is complete. CONGRATS')) {
                this.currentLevelId = 1;
                this.scene.restart({ levelId: this.currentLevelId });    
            }

        } else {
            this.scene.restart({ levelId: this.currentLevelId });
        }
        
    }

    public initializeItemsOnUpperPart(): void {
        let objectives:ObjectiveSlot[] = LEVEL_MANIFEST[this.currentLevelId - 1].objectives;
        this.upperPart.initializeItems(objectives);
    }
}
