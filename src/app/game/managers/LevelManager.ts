// managers/LevelManager.ts
import * as Phaser from 'phaser';
import { LEVEL_MANIFEST, LevelData, LevelPhase } from '../types/LevelConfig';
import { PlayerData } from './PlayerData'; // We'll make this next

export class LevelManager {
    private scene: Phaser.Scene;
    private currentLevel: LevelData;
    private isGameOver: boolean = false;

    // We accept a levelId so we know which config to load
    constructor(scene: Phaser.Scene, levelId: number) {
        this.scene = scene;
        this.currentLevel = LEVEL_MANIFEST.find(l => l.id === levelId) || LEVEL_MANIFEST[0];
    }

    public start() {
        console.log(`Starting Level: ${this.currentLevel.title}`);
        
        
    }

    // --- END GAME HANDLING ---
    public handleVictory() {
        console.log("VICTORY!");
        
        // Unlock next level
        PlayerData.unlockLevel(this.currentLevel.id + 1);
        
        // Go to Win Scene (Pass data so we know what to show)
        this.scene.scene.start('WinScene', { 
            levelId: this.currentLevel.id,
            nextLevelId: this.currentLevel.id + 1 
        });
    }

    public handleDefeat() {
        console.log("DEFEAT");
        
        // Go to Game Over Scene
        this.scene.scene.start('GameOverScene', { 
            retryLevelId: this.currentLevel.id 
        });
    }
 
}