import * as Phaser from 'phaser';
import { DTC } from '../../DTC';
import { Dice } from '../sprites/Dice';
import { AudioManager } from '../managers/AudioManager';

export default class PlayCards extends Phaser.GameObjects.Container {
    private dtc: DTC = new DTC();
    private playcardsBg!:Phaser.GameObjects.Image;
    private cards:Phaser.GameObjects.Sprite[] = [];
    private readonly numCards:number = 5;
    private cardValues:Map<number, number> = new Map<number, number>();
    private numTooltipDisplays:number = 0;
    private readonly numTooltipDisplaysMax:number = 2;
    private dice!:Dice;

    constructor(scene: Phaser.Scene, x: number, y: number, audioManager: AudioManager) {
        super(scene, x, y);
        
        // Best Practice: Define depth inside the class if it's intrinsic to the object
        // this.setDepth(-5); 
        
        scene.add.existing(this); // Add the empty container to the scene

        this.playcardsBg = scene.add.image(0, 0, 'playcards-bg').setOrigin(0, 0);
        this.add(this.playcardsBg);

        this.createCards();

        this.dice = new Dice(scene, 1100, 150, audioManager);
        this.dice.on('dice-roll', (diceResult:number) => {
            this.diceRoll(diceResult);
        });
        this.add(this.dice);

        this.openOneRandomCard(false);
    }

    private createCards(): void {
        this.cardValues = new Map<number, number>();

        const wCol:number = 175;
        const xStart:number = 130;
        const yStart:number = 170;

        for(let i = 0; i < this.numCards; i++) {
            const x = xStart + i * wCol;
            const y = yStart;

            let card = this.scene.add.sprite(x, y, 'playcard-back').setInteractive();
            card.setScale(0.9);
            card.setData('id', i);              // Attach the ID directly to the card object 
            card.on('pointerdown', () => { });  // 2. Add the listener
            this.cards.push(card);
            this.add(card);

            let cardDiceImage = this.scene.add.sprite(x, y, 'imgDice-1')
                .setInteractive()
                .setOrigin(0.5, 0.5)
                .setScale(0.4)
                .setAngle(Phaser.Math.Between(-15, 15))
                .setVisible(false);         
            cardDiceImage.on('pointerdown', () => {
            });
            this.add(cardDiceImage);

            this.cardValues.set(i, 0);
        }
    }

    private handleDiceRoll(cardIndex: number, diceValue:number, diceImage:Phaser.GameObjects.Sprite): void {
        const card = this.cards[cardIndex];

        //this.theScene.events.emit(PLAYCARD_EVENTS.PLAYCARD_DICE_ROLL, this.cardValues.get(cardIndex));
        this.diceRoll(diceValue);
        this.cardValues.set(cardIndex, 0);
        card.setTexture('playcard-back');
        card.setVisible(true);
        diceImage.destroy();
        //this.theScene.playSound('soundPlaycardMove')
    }

    public resetCards() {
         for(let i = 0; i < this.numCards; i++) {
            const card = this.cards[i];
            card.setVisible(true);
            this.cardValues.set(i, 0);
            card.setTexture('playcard-back');
            this.numTooltipDisplays = 0;
         }
    }

    private diceRoll(diceResult:number): void {
        this.emit('dice-roll', diceResult);
    }

    public openOneRandomCard(isSpecial:boolean): void {
        let availableCards:number[] = [];
        
        for(let i = 0; i < this.numCards; i++) {    
            if(this.cardValues.get(i) == 0) {
                availableCards.push(i);
            }
        }

        if(availableCards.length > 0) {
            let idx:number = Phaser.Math.Between(0, availableCards.length - 1);
            let cardIndex:number = availableCards[idx];

            let card:Phaser.GameObjects.Sprite = this.cards[cardIndex];
            card.setTexture('playcard-front');
            card.setVisible(true);

            if(isSpecial) {
                console.log('Open one random special playcard');

            } else {
                let diceValue:number = Phaser.Math.Between(1, 6);
                let frameNo:number = diceValue - 1;
                this.cardValues.set(cardIndex, diceValue);
                let cardDiceImage = this.scene.add.sprite(card.x, card.y, 'dice-atlas', frameNo).setInteractive();         
                cardDiceImage.setScale(0.22);
                cardDiceImage.setAngle(Phaser.Math.Between(-15, 15));
                cardDiceImage.setVisible(true);
                cardDiceImage.on('pointerdown', () => {
                    this.handleDiceRoll(cardIndex, diceValue, cardDiceImage);
                });
                this.add(cardDiceImage);
            }
        }
    }
}