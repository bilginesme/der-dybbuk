export enum ItemNature {
    GOOD = 'good',
    HEALER = 'healer',
    BAD = 'bad',
    PURE_EVIL = 'pure_evil',
    COLLECTABLE = 'collectable',
    NONE= 'none'
}

export interface ItemData {
    itemName: string;
    nature: ItemNature;
    textureFrameNo: number; // Using frame index from your atlas
    possessionImpact: number; // e.g., +20 or -10
    description: string;
}

export const ITEM_INVENTORY: Record<number, ItemData> = {
    1: {
        itemName: 'strong potion',
        nature: ItemNature.GOOD,
        textureFrameNo: 0,
        possessionImpact: -15,
        description: 'Protects against minor possessions.'
    },
    2: {
        itemName: 'skull',
        nature: ItemNature.BAD,
        textureFrameNo: 3,
        possessionImpact: 20,
        description: 'Increases movement but burdens the soul.'
    },
    3: {
        itemName: 'potion',
        nature: ItemNature.GOOD,
        textureFrameNo: 5,
        possessionImpact: -10,
        description: 'A holy relic that clears a path.'
    },
    4: {
        itemName: 'worse skull',
        nature: ItemNature.BAD,
        textureFrameNo: 4,
        possessionImpact: 25,
        description: 'Attracts the Dybbuk closer.'
    },
    5: {
        itemName: 'key',
        nature: ItemNature.COLLECTABLE,
        textureFrameNo: 2,
        possessionImpact: 0,
        description: 'Collect the keys'
    },
    6: {
        itemName: 'healer',
        nature: ItemNature.HEALER,
        textureFrameNo: 9,
        possessionImpact: -25,
        description: 'A super healer.'
    },
    7: {
        itemName: 'pure evil',
        nature: ItemNature.PURE_EVIL,
        textureFrameNo: 10,
        possessionImpact: 50,
        description: 'Pure evil'
    },
};