import * as Phaser from 'phaser';
import { DTC } from '../../DTC';
import { Moon } from '../sprites/Moon';
import Clouds from './Clouds';
import { Mist } from './Mist';
import { ObjectiveSlot } from '../types/LevelConfig';
import { ItemData } from '../types/ItemConfig';

export default class UpperPart extends Phaser.GameObjects.Container {
    private dtc: DTC = new DTC();
    private clouds:Clouds;
    private mist:Mist;
    private moon:Moon;
    private scenery!:Phaser.GameObjects.Image;
    private imgObjectives:Phaser.GameObjects.Image[] = [];
    private objectives:ObjectiveSlot[] = [];
    //private readonly alphaGhost:number = 0.85;
    private readonly alphaGhost:number = 0.3;
    private readonly scaleItem:number = 0.35;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
        // Best Practice: Define depth inside the class if it's intrinsic to the object
        // this.setDepth(-5); 
        
        scene.add.existing(this); // Add the empty container to the scene

        this.moon = new Moon(scene);
        this.add(this.moon);

        this.clouds = new Clouds(scene).setDepth(-5);
        this.add(this.clouds);

        this.scenery = scene.add.image(0, 300, 'scenery-01').setOrigin(0, 1);
        this.add(this.scenery);

        this.mist = new Mist(scene, 150, 150, 2.5);
        this.add(this.mist);
    }

    public initializeItems(objectives:ObjectiveSlot[]): void {
        this.objectives = objectives;
        this.imgObjectives = [];

        let startX = 70;
        let startY = 280;
        let xSpace:number = 75;

        for(let i:number=0; i < objectives.length; i++) {
            let x:number = startX + i * xSpace;
            let y:number = startY;
            let frameNo = 2;     
            const img = this.scene.add.image(x, y, 'items-atlas', frameNo)
                .setScale(this.scaleItem)
                .setOrigin(0.5, 1.0)
                .setAlpha(this.alphaGhost)
                .setTint(0xAAAAAA)
                .setInteractive();

            this.scene.tweens.add({
                targets: img,
                y: '+=10',
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            this.imgObjectives.push(img);
            this.add(img);
        }
    }

    public newItemAcquired(item:ItemData): void {
        // Find the first unfilled slot for this item type
        const slotIndex = this.objectives.findIndex(
            obj => obj.itemType === item.itemName && !obj.isFilled
        );

        if (slotIndex !== -1) {
            this.objectives[slotIndex].isFilled = true;
            
            // Trigger the visual "Real Icon" update
            this.imgObjectives[slotIndex].setAlpha(1.0);;
            
            // Check if the level is complete
            //this.checkVictory();
        }
    }
}