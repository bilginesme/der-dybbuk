export class Mist extends Phaser.GameObjects.Container {
    private yMin: number;
    private yMax: number;
    private scaleFactor: number;
    private isThereAMistNow: boolean = false;

    private durationMin: number = 40000; // In ms for tweens
    private durationMax: number = 50000;
    private alphaMax: number = 0.8;
    private alphaMin: number = 0.2;

    private pMist = 0.05; 

    constructor(scene: Phaser.Scene, yMin: number, yMax: number, scaleFactor: number) {
      super(scene, 0, 0);
      
      this.yMin = yMin;
      this.yMax = yMax;
      this.scaleFactor = scaleFactor;

      scene.add.existing(this);
      this.startMistLogic();
    }

    private startMistLogic() {
      // Use Phaser Timer instead of setTimeout for better lifecycle management
      this.scene.time.addEvent({
         delay: 5000, 
         callback: this.tryCreateMist,
         callbackScope: this,
         loop: true
      });
    }

    private tryCreateMist() {
      if (this.isThereAMistNow) return;
      if (Phaser.Math.FloatBetween(0, 1) > this.pMist) return;
      this.isThereAMistNow = true;

      // Assuming your keys are 'mist-01', 'mist-02', etc.
      const imgNum = Phaser.Math.Between(1, 3); // Adjust based on your DTC.numMistTypes
      const key = `mist-${imgNum.toString().padStart(2, '0')}`;
      
      const mistSprite = this.scene.add.sprite(0, 0, key);
      this.add(mistSprite); // Add to container

      // Randomize Start Side
      // Define a margin so the mist starts and ends completely off-screen
      const margin = 800; 

      const goRight = Math.random() > 0.5;
      // Start further back in the "wings"
      const startX = goRight ? -margin : this.scene.scale.width + margin;
      // End further past the opposite edge
      const endX = goRight ? this.scene.scale.width + margin : -margin;

      mistSprite.setPosition(startX, Phaser.Math.Between(this.yMin, this.yMax));
      mistSprite.setScale(this.scaleFactor);
      mistSprite.setAlpha(0);
      mistSprite.setOrigin(0.5, 0.5);
      if (!goRight) mistSprite.setFlipX(true);

      // Movement and Alpha Sequence using modern Chainable Tweens
      this.scene.tweens.add({
         targets: mistSprite,
         x: endX,
         duration: Phaser.Math.Between(this.durationMin, this.durationMax),
         onComplete: () => {
               mistSprite.destroy();
               this.isThereAMistNow = false;
         }
      });

      // Separate Fade In/Out for that "eerie" look
      this.scene.tweens.add({
         targets: mistSprite,
         alpha: { from: 0, to: Phaser.Math.FloatBetween(this.alphaMin, this.alphaMax) },
         duration: 20000,
         yoyo: true,
         hold: 20000,
         repeat: -1
      });
    }
}