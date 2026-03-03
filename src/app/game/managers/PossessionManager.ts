export interface PossessionState {
    score: number;
    threshold: number;
    isPossessed: boolean;
    turnsToRecover: number;
    maxTurns: number;
}

export class PossessionManager {
    public state: PossessionState;
    private readonly scoreMin: number = 0;
    private readonly scoreMax: number = 100;
    private startingPossession:number = 40;
    
    constructor(threshold: number = 80, maxTurns: number = 5) {
        this.state = {
            score: this.startingPossession,
            threshold: threshold,
            isPossessed: false,
            turnsToRecover: 0,
            maxTurns: maxTurns
        };
    }

    public updateScore(amount: number): boolean {
        this.state.score = Phaser.Math.Clamp(this.state.score + amount, 0, 100);
        
        if(this.state.score < this.scoreMin) {
            this.state.score = this.scoreMin;
        }

        if(this.state.score > this.scoreMax) {
            this.state.score = this.scoreMax;
        }

        // Trigger Possession if score hits threshold
        if (this.state.score >= this.state.threshold && !this.state.isPossessed) {
            this.state.isPossessed = true;
            this.state.turnsToRecover = this.state.maxTurns;
            return true; // Just became possessed
        }
        
        // Recovery logic
        if (this.state.score < this.state.threshold) {
            this.state.isPossessed = false;
            this.state.turnsToRecover = 0;
        }
        
        return false;
    }

    public decrementTurn(): boolean {
        if (this.state.isPossessed) {
            this.state.turnsToRecover--;
            return this.state.turnsToRecover <= 0; // Returns true if Game Over
        }
        return false;
    }

    public isPossessedNow():boolean {
        return this.state.isPossessed;
    }
}