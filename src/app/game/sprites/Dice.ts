import { AudioManager } from "../managers/AudioManager";

export class Dice extends Phaser.GameObjects.Sprite {
    public isDiceRollingNow:boolean = false;
   private audiomanager:AudioManager;

    constructor(scene: Phaser.Scene, x: number, y: number, audioManager: AudioManager) {
      super(scene, x, y, 'dice-atlas', 0);

      this.audiomanager = audioManager;

      this.setInteractive();
      scene.add.existing(this);

      this.setOrigin(0.5, 0.5); // Center the origin
      this.setScale(0.45);        // Set initial scale

      let initialFrame:number = Phaser.Math.Between(0, 5);
      let initialAngle:number = Phaser.Math.Between(-30, 30);
        
      this.setFrame(initialFrame);
      this.angle = initialAngle;

      this.on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
      this.on(Phaser.Input.Events.POINTER_UP, this.handlePointerUp, this);
    }
    
    private handlePointerDown(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData): void {
        this.setTint(0xff0000); 
    }

    private handlePointerUp(pointer: Phaser.Input.Pointer, localX: number, localY: number, event: Phaser.Types.Input.EventData): void {
      this.clearTint(); 

         
      this.startDiceRollAnimation();
    }

      private startDiceRollAnimation(): void {
        this.isDiceRollingNow = true;   
        const animationDuration = 1000; // Total duration in milliseconds
        const interval = 100; // Time interval in milliseconds
        let elapsedTime = 0;
        
        let finalRoll = 0;
        finalRoll = Phaser.Math.Between(1, 6); // temporary

        this.audiomanager.playSFX('soundDice');

        // Start the animation with setInterval
        const timer = setInterval(() => {
            const randomIndex = Phaser.Math.Between(1, 6);  // Select a random dice texture
            this.setFrame(randomIndex - 1);

            // Update elapsed time
            elapsedTime += interval;
            this.angle+= 35;
            
            // Stop the animation after the specified duration
            if (elapsedTime >= animationDuration) {
                clearInterval(timer);
                this.setFrame(finalRoll - 1);
                this.isDiceRollingNow = false;
                //this.theScene.events.emit(DICE_EVENTS.ROLL_COMPLETED, finalRoll);
                this.emit('dice-roll', finalRoll);
            }
        }, interval);
    }
  
}