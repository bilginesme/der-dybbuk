import * as Phaser from 'phaser';
import { DTC } from '../../DTC';
import { LevelData } from '../types/LevelConfig';

export default class ScoreBoard extends Phaser.GameObjects.Container {
   private dtc: DTC = new DTC();
   private txtScore: Phaser.GameObjects.Text;
   private txtLevel: Phaser.GameObjects.Text;
   private txtLevelDesc: Phaser.GameObjects.Text;

   constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y);
      
      // Best Practice: Define depth inside the class if it's intrinsic to the object
      // this.setDepth(-5); 
      
      scene.add.existing(this); // Add the empty container to the scene

      this.txtScore = scene.add.text(300, 0, '000', {
         fontSize: '48px',
         color: '#ffffff', 
         fontStyle: 'bold',
         fontFamily: this.dtc.strFontFamily,
         stroke: '#000000',
         strokeThickness: 4,
         shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, fill: true }
         })
         .setOrigin(0.0, 0.5)
         .setVisible(true); 
      this.add(this.txtScore);
   
      this.txtLevel = scene.add.text(0, 0, '000', {
         fontSize: '48px',
         color: '#ffffff', 
         fontStyle: 'bold',
         fontFamily: this.dtc.strFontFamily,
         stroke: '#000000',
         strokeThickness: 4,
         shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, fill: true }
         })
         .setOrigin(0, 0.5)
         .setVisible(true); 
      this.add(this.txtLevel);

      this.txtLevelDesc = scene.add.text(0, 40,  '000', {
         fontSize: '36px',
         color: '#ffffff', 
         fontStyle: 'bold',
         fontFamily: this.dtc.strFontFamily,
         stroke: '#000000',
         strokeThickness: 4,
         shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 2, fill: true },
         wordWrap: { 
            width: 600,   // The fixed width in pixels
            useAdvancedWrap: true // Handles better line breaking
         }
         })
         .setOrigin(0, 0)
         .setVisible(true); 
      this.add(this.txtLevelDesc);
   }

   public updateScore(newScore: number) {
      this.txtScore.setText(newScore.toString());
   }

   public updateLevel(level: LevelData) {
      this.txtLevel.setText('Level ' + level.id.toString());
      this.txtLevelDesc.setText(level.title);
   }
}