
 export interface LevelData {
    id: number;
    title: string;
    goodItems: number[];
    badItems: number[];
    toggleVisibilityStones: number[];
    collectables: { itemType: string, stoneID: number }[];
    items: string[];        // Total seconds (e.g., 180s = 3 mins)
    objectives:ObjectiveSlot[]
}

export interface ObjectiveSlot {
    itemType: string;
    isFilled: boolean;
}

export const LEVEL_MANIFEST: LevelData[] = [
    {
        id: 1,
        title: "Collect the 3 keys before getting possessed",
        goodItems: [ 7, 10, 16, 24, 26],
        badItems: [3, 6, 9, 12, 13, 19, 20, 21, 25],
        toggleVisibilityStones: [], 
        collectables: [ {itemType: 'key', stoneID: 5}, {itemType: 'key', stoneID: 11}, {itemType: 'key', stoneID: 17}, {itemType: 'key', stoneID: 22} ],
        items: ['key', 'key', 'key'],
        objectives: [
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false }
        ]
    },
    {
        id: 2,
        title: "Collect the 4 keys before getting possessed",
        goodItems: [3,  9, 12, 17, 22, 28 ],
        badItems: [1, 4, 8, 14, 15, 19, 20, 21, 25, 31, 32],
        toggleVisibilityStones: [2, 13],
        collectables: [ 
            {itemType: 'key', stoneID: 6}, 
            {itemType: 'key', stoneID: 10}, 
            {itemType: 'key', stoneID: 16}, 
            {itemType: 'key', stoneID: 29}, 
            {itemType: 'key', stoneID: 34} ],
        items: ['key', 'key', 'key', 'key'],
        objectives: [
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false }
        ]
    },
    {
        id: 3,
        title: "Collect the 5 keys before getting possessed",
        goodItems: [3, 9, 12, 18, 26, 31],
        badItems: [1, 4, 6, 8, 14, 15, 17, 19, 20, 21, 25, 29, 30, 33],
        toggleVisibilityStones: [2, 13],
        collectables: [ 
            {itemType: 'key', stoneID: 11}, 
            {itemType: 'key', stoneID: 16}, 
            {itemType: 'key', stoneID: 23}, 
            {itemType: 'key', stoneID: 28},
            {itemType: 'key', stoneID: 32} ],
        items: ['key', 'key', 'key', 'key', 'key'],
        objectives: [
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false }
        ]
    },
    {
        id: 4,
        title: "A very hard game",
        goodItems: [3, 9, 12, 18, 26, 31],
        badItems: [1, 4, 8, 11, 14, 15, 17, 19, 20, 21, 22, 25, 27, 30, 33],
        toggleVisibilityStones: [2, 13],
        collectables: [ 
             
            {itemType: 'key', stoneID: 10}, 
            {itemType: 'key', stoneID: 16}, 
            {itemType: 'key', stoneID: 23},             
            {itemType: 'key', stoneID: 28},
            {itemType: 'key', stoneID: 34} ],
        items: ['key', 'key', 'key', 'key', 'key'],
        objectives: [
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false }
        ]
    },
    {
        id: 99,
        title: "Dummy level",
        goodItems: [ ],
        badItems: [],
        toggleVisibilityStones: [],
        collectables: [ 
            {itemType: 'key', stoneID: 1}, 
            {itemType: 'key', stoneID: 2}, 
            {itemType: 'key', stoneID: 3}, 
            {itemType: 'key', stoneID: 4},
            {itemType: 'key', stoneID: 5}, 
            {itemType: 'key', stoneID: 6}, 
            {itemType: 'key', stoneID: 7}, 
            {itemType: 'key', stoneID: 8} 
        ],
        items: ['key', 'key'],
        objectives: [
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false },
            { itemType: 'key', isFilled: false }
        ]
    },
];