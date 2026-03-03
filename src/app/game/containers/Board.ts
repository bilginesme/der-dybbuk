import * as Phaser from 'phaser';
import { BOARD_MANIFEST, StoneData } from '../types/BoardConfig';
import { DTC } from '../../DTC';
import { ITEM_INVENTORY, ItemData, ItemNature } from '../types/ItemConfig';
import { GameScene } from '../scenes/GameScene';
import { LEVEL_MANIFEST } from '../types/LevelConfig';

export default class UpperPart extends Phaser.GameObjects.Container {
    private dtc: DTC = new DTC();
    private theScene:GameScene;
    private boardFrame!:Phaser.GameObjects.Image;
    private template!:Phaser.GameObjects.Image;
    private cornerLeft!:Phaser.GameObjects.Image;
    private cornerRight!:Phaser.GameObjects.Image;
    private gemLeft!:Phaser.GameObjects.Sprite;
    private gemRight!:Phaser.GameObjects.Sprite;
    private stones:Phaser.GameObjects.Image[] = [];
    private readonly posPawnInitial:{x:number, y:number} = { x:130, y:1990 };
    private pawn:Phaser.GameObjects.Sprite;
    private pawnLocation!:number;
    private isPawnMoving:boolean = false;
    private itemSpriteMap: Map<number, ItemData> = new Map();
    private itemsCollected:string[] = [];

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this); // Add the empty container to the scene

        this.theScene = scene;

        this.boardFrame = scene.add.image(0, 0, 'board-frame').setOrigin(0, 0);
        this.add(this.boardFrame);

        // for world creation
        this.template = scene.add.image(0, 0, 'template').setOrigin(0, 0).setAlpha(0.0);
        this.template.setInteractive();
        this.add(this.template);
        
        this.cornerLeft = scene.add.image(0, 0, 'corner-left').setOrigin(0, 0).setInteractive();
        this.cornerLeft.on('pointerdown', () => {
            this.emit('restart-game');
        });
        this.add(this.cornerLeft);

        this.cornerRight = scene.add.image(1260, 0, 'corner-right').setOrigin(1, 0);
        this.add(this.cornerRight);

        this.gemLeft = scene.add.sprite(90, 90, 'gem-green').setOrigin(0.5, 0.5);
        this.add(this.gemLeft);

        this.gemRight = scene.add.sprite(1170, 90, 'gem-green').setOrigin(0.5, 0.5);
        this.add(this.gemRight);
        
        this.pawn = scene.add.sprite(this.posPawnInitial.x, this.posPawnInitial.y, 'pawn')
            .setOrigin(0.5, 0.9)
            .setAlpha(1)
        
        this.createStones();
        this.createItems();

        this.add(this.pawn);
        this.initialize();
    }

    public initialize(): void {
        this.pawn.setPosition(this.posPawnInitial.x, this.posPawnInitial.y);
        this.pawnLocation = -1;
        this.isPawnMoving = false;
        this.itemsCollected = [];
    }

    private createStones(): void {
        this.stones = [];
        
        for(let i:number=0; i < BOARD_MANIFEST.length; i++) {
            var stone = BOARD_MANIFEST[i];
            stone.itemNature = ItemNature.NONE;

            let alpha:number = Phaser.Math.FloatBetween(0.50, 0.70);
            const imgStone = this.scene.add.image(stone.x, stone.y, 'stones-atlas', stone.stoneFrame)
                .setOrigin(0.5, 0.5)
                .setScale(stone.scale)
                .setAlpha(alpha)
                .setAngle(stone.rotation);
            this.add(imgStone);
            this.stones.push(imgStone);

            let badItems:number[] = LEVEL_MANIFEST[this.theScene.getCurrentLevelID() - 1].badItems;

            if(badItems.includes(stone.id)) {
                const skull = this.scene.add.image(stone.x, stone.y, 'skull')
                    .setOrigin(0.5, 0.5)
                    .setAlpha(0.2);
                this.add(skull);
            }
        }
    }

    private createItems(): void {
        const currentLevel = LEVEL_MANIFEST[this.theScene.getCurrentLevelID() - 1];

        // 1. Place the static 'Collectables' (Keys)
        currentLevel.collectables.forEach(c => {
            // Find the 'key' ID in your ITEM_INVENTORY (which is 5)
            this.placeItemOnStone(c.stoneID, 5); 
        });

        // 2. Place the randomized GOOD items
        this.placeRandomizedItems(currentLevel.goodItems, ItemNature.GOOD);

        // 3. Place the randomized BAD items
        this.placeRandomizedItems(currentLevel.badItems, ItemNature.BAD);
    }

    private placeRandomizedItems(stoneIds: number[], nature: ItemNature): void {
        const matchingItemIds = Object.keys(ITEM_INVENTORY)
            .map(Number)
            .filter(id => ITEM_INVENTORY[id].nature === nature);

        if (matchingItemIds.length > 0) {
            stoneIds.forEach(stoneId => {
                let stone:StoneData = BOARD_MANIFEST.find(s => s.id === stoneId)!;
                if(stone) {
                    const randomIndex = Phaser.Math.Between(0, matchingItemIds.length - 1);
                    this.placeItemOnStone(stoneId, matchingItemIds[randomIndex]);
                    BOARD_MANIFEST[stoneId - 1].itemNature = nature;
                }
            });
        }
    }

    private placeItemOnStone(stoneId: number, itemKey: number) {
        const stoneSprite = BOARD_MANIFEST.find(s => s.id === stoneId);
        const itemInfo = ITEM_INVENTORY[itemKey];

        if (!stoneSprite || !itemInfo) 
            return;

        // Use the atlas key and the frame number from the manifest
        const itemSprite = this.scene.add.sprite(
            stoneSprite.x, 
            stoneSprite.y, 
            'items-atlas', 
            itemInfo.textureFrameNo
        ).setOrigin(0.5, 0.9).setScale(0.5).setInteractive().setData('stoneId', stoneId);
        this.add(itemSprite);
        this.itemSpriteMap.set(stoneId, itemInfo); // Store it

        // Spectral floating animation
        this.scene.tweens.add({
            targets: itemSprite,
            y: stoneSprite.y - 15,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        stoneSprite.itemType = itemKey;
    }

    public playTheDice(diceResult: number) {
        const movementPath: { x: number, y: number }[] = [];
        let currentId = this.pawnLocation;

        for (let i = 0; i < diceResult; i++) {
            let nextStone: StoneData | undefined;

            if (currentId === -1) {
                // Logic for the very first move: jump to Stone ID 1
                nextStone = BOARD_MANIFEST.find(s => s.id === 1);
            } else {
                // Standard walking logic
                nextStone = this.findNextVisibleStone(currentId);
            }

            if (nextStone && nextStone.isVisible) {
                movementPath.push({ x: nextStone.x, y: nextStone.y });
                currentId = nextStone.id;
            } else {
                console.warn("Path blocked or stone is sunken!");
                break;
            }
        }

        // Pass the calculated points to your animation handler
        
        this.movePawn(movementPath);

        // Save the new position for the next turn
        this.pawnLocation = currentId;
    }

    private findNextVisibleStone(currentId: number): StoneData | undefined {
        const currentStone = BOARD_MANIFEST.find(s => s.id === currentId);
        if (!currentStone) return undefined;

        // Look through nextIds and return the first one that is visible in the manifest
        for (const nextId of currentStone.nextIds) {
            const stone = BOARD_MANIFEST.find(s => s.id === nextId);
            if (stone && stone.isVisible) {
                return stone;
            }
        }
        return undefined;
    }

    public movePawn(points: { x: number, y: number }[]): void {
        // 1. Base Case: No more points to move to
        if (points.length === 0) {
            this.handleAfterMovePawnComplete();
            return;
        }

        this.isPawnMoving = true;

        // 2. Get the next target point (removes it from the array)
        const nextPoint = points.shift(); 
        if (!nextPoint) return; // Safety check

        this.scene.tweens.add({
            targets: this.pawn,
            x: nextPoint.x,
            y: nextPoint.y,
            duration: 500, // Time to move one tile (ms)
            ease: 'Power1', // 'Linear' is good for constant speed, 'Power1' for slight ease
            onComplete: () => {
                this.movePawn(points);  // 5. RECURSION: Call the function again with the remaining points
            }
        });
    }

    private handleAfterMovePawnComplete(): void {
        this.isPawnMoving = false;
        
        const stoneId = this.pawnLocation;
        var stone = BOARD_MANIFEST[stoneId - 1];
        const item = this.itemSpriteMap.get(stoneId);
        const itemSprite = this.list.find(child => child.getData('stoneId') === stoneId) as Phaser.GameObjects.Sprite;

        if(item && itemSprite) {
            const stoneInManifest = BOARD_MANIFEST.find(s => s.id === stoneId);
            if (stoneInManifest) {
                //stoneInManifest.itemNature = ItemNature.NONE;
                stoneInManifest.itemType = 0;
            }
            
            let canTakeIt:boolean = false;
            if(this.theScene.isPossessedNow()) {
                if(item.nature != ItemNature.COLLECTABLE) {
                    canTakeIt = true;
                } else {
                    canTakeIt = false;
                }
            } else {
                canTakeIt = true;
            }

            if(canTakeIt) {
                this.emit('pawn-movement-complete', item); 
                this.itemSpriteMap.delete(stoneId);
                const swayDistance = 40; // Pixels to the left and right

                // 1. The Ascent (Upwards and Fading)
                this.scene.tweens.add({
                    targets: itemSprite,
                    y: itemSprite.y - 500,
                    alpha: 0,
                    scale: 1.2, // Slightly grows as it "floats closer" to the camera
                    duration: 3000,
                    ease: 'Power1',
                    onComplete: () => {
                        itemSprite.destroy();
                    }
                });

                // 2. The Sway (Sinusoidal left and right)
                this.scene.tweens.add({
                    targets: itemSprite,
                    x: itemSprite.x + swayDistance,
                    duration: 750, // Time for one full sway
                    yoyo: true,    // Returns to start
                    repeat: 3,     // Repeat to cover the 3000ms ascent
                    ease: 'Sine.easeInOut' // Creates the smooth curves
                });

                if(item.nature == ItemNature.COLLECTABLE) {
                    const availableStones = BOARD_MANIFEST.filter(s => s.itemNature == ItemNature.GOOD && s.itemType == 0 && s.id != stoneId);
                    this.itemsCollected.push(item.itemName.toString());

                    let idx:number = Phaser.Math.Between(0, availableStones.length - 1);
                    let stoneToBeAssigned:StoneData = availableStones[idx];
                    
                    if(stoneToBeAssigned) {
                        const matchingItemIds = Object.keys(ITEM_INVENTORY)
                        .map(Number)
                        .filter(id => ITEM_INVENTORY[id].nature === ItemNature.HEALER);

                        if (matchingItemIds.length > 0) {
                            // 2. Pick a random ID from the matching list
                            const randomIndex = Phaser.Math.Between(0, matchingItemIds.length - 1);
                            const selectedItemType = matchingItemIds[randomIndex];
                            
                            this.placeItemOnStone(stoneToBeAssigned.id, selectedItemType);
                        }
                    }   // Create another GOOD item elsewhere
                }   
            }
        }
        else {
            if(stone.itemNature == ItemNature.BAD) {
                const availableStones = BOARD_MANIFEST.filter(s => s.itemNature == ItemNature.BAD && s.itemType == 0 && s.id != stoneId);
                let idx:number = Phaser.Math.Between(0, availableStones.length - 1);
                let stoneToBeAssigned:StoneData = availableStones[idx];
                
                if(stoneToBeAssigned) {
                    const matchingItemIds = Object.keys(ITEM_INVENTORY)
                    .map(Number)
                    .filter(id => ITEM_INVENTORY[id].nature === ItemNature.BAD);

                    if (matchingItemIds.length > 0) {
                        // 2. Pick a random ID from the matching list
                        const randomIndex = Phaser.Math.Between(0, matchingItemIds.length - 1);
                        const selectedItemType = matchingItemIds[randomIndex];
                        
                        this.placeItemOnStone(stoneToBeAssigned.id, selectedItemType);
                    }
                }
            }// Create another BAD item elsewhere
        }

        if(this.theScene.isPossessedNow()) {
            this.gemLeft.setTexture('gem-red');
            this.gemRight.setTexture('gem-red');
        } else {
            this.gemLeft.setTexture('gem-green');
            this.gemRight.setTexture('gem-green');
        }

        let isLevelComplete:boolean = this.checkWinCondition(this.theScene.getCurrentLevelID());
        console.log('isLevelComplete = ' + isLevelComplete);

        if(isLevelComplete) {
            this.theScene.nextLevel();
        }
    }
 
    private checkWinCondition(currentLevelId: number): boolean {
        // 1. Get the objective from your manifest
        const levelGoal = LEVEL_MANIFEST.find(l => l.id === currentLevelId);
        if (!levelGoal) return false;

        // 2. Check if every required item has been collected enough times
        // We use 'every' to ensure all requirements are met
        const isComplete = levelGoal.items.every(requiredItem => {
            const collectedCount = this.itemsCollected.filter(item => item === requiredItem).length;
            const requiredCount = levelGoal.items.filter(item => item === requiredItem).length;
            
            return collectedCount >= requiredCount;
        });

        return isComplete;
    }
}