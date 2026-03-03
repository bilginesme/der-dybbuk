
export interface LevelPhase {
    startTime: number;       // Seconds when this phase begins
    spawnInterval: number;   // How often items fall (ms)
    evilRatio: number;       // 0.0 = All Potion, 1.0 = All Damage
}

export interface LevelData {
    id: number;
    title: string;
    goodItems: number[];
    badItems: number[];
    collectables: { itemType: string, stoneID: number }[];
    items: string[];        // Total seconds (e.g., 180s = 3 mins)
}

export const LEVEL_MANIFEST: LevelData[] = [
    {
        id: 1,
        title: "Collect the 3 keys before getting possessed",
        goodItems: [4, 7, 10, 16, 18, 24, 26],
        badItems: [3, 6, 9, 12, 13, 19, 20, 21, 25],
        collectables: [ {itemType: 'key', stoneID: 5}, {itemType: 'key', stoneID: 11}, {itemType: 'key', stoneID: 17}, {itemType: 'key', stoneID: 22} ],
        items: ['key', 'key', 'key']
    },
    {
        id: 2,
        title: "Collect the 4 keys before getting possessed",
        goodItems: [3, 7, 9, 12, 17, 18, 22, 26],
        badItems: [1, 2, 8, 13, 14, 15, 19, 20, 21, 25],
        collectables: [ {itemType: 'key', stoneID: 6}, {itemType: 'key', stoneID: 10}, {itemType: 'key', stoneID: 16}, {itemType: 'key', stoneID: 23}, {itemType: 'key', stoneID: 24} ],
        items: ['key', 'key', 'key', 'key']
    },
    {
        id: 3,
        title: "Collect the 5 keys before getting possessed",
        goodItems: [3, 7, 9, 12, 17, 18, 22, 26],
        badItems: [1, 2, 8, 13, 14, 15, 19, 20, 21, 25],
        collectables: [ {itemType: 'key', stoneID: 6}, {itemType: 'key', stoneID: 10}, {itemType: 'key', stoneID: 16}, {itemType: 'key', stoneID: 23}, {itemType: 'key', stoneID: 24} ],
        items: ['key', 'key', 'key', 'key', 'key']
    },
];