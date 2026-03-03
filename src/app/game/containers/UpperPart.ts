import * as Phaser from 'phaser';
import { DTC } from '../../DTC';
import { Moon } from '../sprites/Moon';
import Clouds from './Clouds';
import { Mist } from './Mist';

export default class UpperPart extends Phaser.GameObjects.Container {
    private dtc: DTC = new DTC();
    private clouds:Clouds;
    private mist:Mist;
    private moon:Moon;
    private scenery!:Phaser.GameObjects.Image;

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
}