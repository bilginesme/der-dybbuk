import { DTC } from "src/app/DTC";
import { TranslateService } from '@ngx-translate/core';

export default class SuccessScene extends Phaser.Scene {
    private translate!: TranslateService;
    private dtc:DTC = new DTC();
    private subText!: Phaser.GameObjects.Text;
    private lamp!: Phaser.GameObjects.Image;
    private buttonPlayAgain!: Phaser.GameObjects.Sprite;
    private txtPlayAgain!: Phaser.GameObjects.Text;
    private buttonNextLevel!: Phaser.GameObjects.Sprite;
    private txtNextLevel!: Phaser.GameObjects.Text;
    private buttonMainMenu!: Phaser.GameObjects.Sprite;
    private txtMainMenu!: Phaser.GameObjects.Text;

    private txtNextLevelTitle!:Phaser.GameObjects.Text;
    private txtNextLevelDescription!:Phaser.GameObjects.Text;

    constructor() {
        super('SuccessScene');
    }

    create(data: { score: number, result: string, levelId: number}) {
        this.translate = this.registry.get('translateService'); 
        this.add.image(0, 0, 'brick-bg').setOrigin(0, 0);
        
        this.lamp = this.add.image(this.scale.width / 2, 250, 'lamp')
            .setOrigin(0.5, 0.1);

        let strResultText:string = 'The result of the game';
        let strScore:string = '0000';

        if(data) {
            if(data.result) {
                strResultText = this.translate.instant('GAME_OVER_SCENE.TITLE_SUCCESS');
            } else {
                strResultText = this.translate.instant('GAME_OVER_SCENE.TITLE_FAILURE');
            }
            
            strScore = data.score.toString();
        }

        this.add.text(this.scale.width / 2, 800, this.translate.instant('GAME_OVER_SCENE.SCORE'), 
        { 
            fontSize: '48px',
                fontStyle: 'normal',
            color: '#d1e6fdff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily
        }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, 900, strScore, 
        { 
            fontSize: '100px',
                fontStyle: 'bold',
            color: '#d1e6fdff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily
        }).setOrigin(0.5);

        this.add.text(this.scale.width / 2, 1300, strResultText, 
        { 
            fontSize: '90px',
            fontStyle: 'bold',
            color: '#d1e6fdff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily 
        }).setOrigin(0.5);

        let levelId:number = data.levelId + 1;
        console.log('Next level is : ' + levelId);
        
        this.buttonNextLevel = this.add.sprite(this.scale.width / 2, 1600, 'button-green-normal');
        this.buttonNextLevel.setInteractive();
        this.buttonNextLevel.on('pointerdown', () => {
            this.buttonNextLevel.setTexture('button-green-pressed');
        });
        this.buttonNextLevel.on('pointerup', () => {
              this.tweens.add({
                targets: this.buttonNextLevel,
                duration: 20000,   
                ease: 'Linear',  
                onComplete: () => {
                    this.buttonNextLevel.setTexture('button-green-normal');
                    this.scene.start('GameScene', { levelId: levelId });
                }
            });
        });

        this.txtNextLevel = this.add.text(this.scale.width / 2, 
            this.buttonNextLevel.y - 10,
            this.translate.instant('GAME_OVER_SCENE.NEXT_LEVEL'),
            { 
            fontSize: '80px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily,
        })
        .setOrigin(0.5);


        this.txtNextLevelTitle = this.add.text(this.scale.width / 2, 
            this.buttonNextLevel.y + 170,
            this.translate.instant('GAME_OVER_SCENE.LEVEL') + ' ' + levelId,
            { 
            fontSize: '60px',
            fontStyle: 'normal',
            color: '#ffffff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily,
        })
        .setOrigin(0.5);

        this.txtNextLevelDescription = this.add.text(this.scale.width / 2, 
            this.buttonNextLevel.y + 240,
            'Description of the level',
            { 
            fontSize: '50px',
            fontStyle: 'normal',
            color: '#ffffff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily,
        })
        .setOrigin(0.5);




        this.buttonPlayAgain = this.add.sprite(this.scale.width / 2, 2250, 'button-green-normal');
        this.buttonPlayAgain.setInteractive();
        this.buttonPlayAgain.on('pointerdown', () => {
            this.buttonPlayAgain.setTexture('button-green-pressed');
        });
        this.buttonPlayAgain.on('pointerup', () => {
              this.tweens.add({
                targets: this.buttonPlayAgain,
                duration: 20000,   
                ease: 'Linear',  
                onComplete: () => {
                    this.buttonPlayAgain.setTexture('button-green-normal');
                    this.scene.start('GameScene');
                }
            });
        });

        this.txtPlayAgain = this.add.text(this.scale.width / 2, 
            this.buttonPlayAgain.y - 10,
            this.translate.instant('GAME_OVER_SCENE.PLAY_AGAIN'),
            { 
            fontSize: '80px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily,
        })
        .setOrigin(0.5);

        this.buttonMainMenu = this.add.sprite(this.scale.width / 2, 2500, 'button-green-normal');
        this.buttonMainMenu.setInteractive();
        this.buttonMainMenu.setScale(0.8);
        this.buttonMainMenu.on('pointerdown', () => {
            this.buttonMainMenu.setTexture('button-green-pressed');
        });
        this.buttonMainMenu.on('pointerup', () => {
              this.tweens.add({
                targets: this.buttonMainMenu,
                duration: 20000,   
                ease: 'Linear',  
                onComplete: () => {
                    this.buttonMainMenu.setTexture('button-green-normal');
                    this.scene.start('MenuScene');
                }
            });
        });

        this.txtMainMenu = this.add.text(this.scale.width / 2, 
            this.buttonMainMenu.y - 10,
            this.translate.instant('GAME_OVER_SCENE.MAIN_MENU'),
            { 
            fontSize: '60px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center',
            fontFamily: this.dtc.strFontFamily,
        })
        .setOrigin(0.5);

    }
}