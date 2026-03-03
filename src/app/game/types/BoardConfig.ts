import { ItemNature } from "./ItemConfig";

export interface StoneData {
    id: number;
    x: number;
    y: number;
    stoneFrame: number;
    scale: number;
    rotation: number;
    // Navigation Logic
    nextIds: number[];    // Array of possible next stones
    isVisible: boolean;   // Whether the stone is currently 'above ground'
    isTrigger?: boolean;  // Does landing here cause other stones to sink/rise?
    itemNature: ItemNature;
    itemType:number;
}
 
export const BOARD_MANIFEST: StoneData[] = [
    {
        id: 1,
        x: 260,
        y: 1780,
        stoneFrame: 4,
        scale: 0.45,
        rotation: 115,
        nextIds: [2],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 2,
        x: 206,
        y: 1560,
        stoneFrame: 5,
        scale: 0.50,
        rotation: 90,
        nextIds: [3],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 3,
        x: 170,
        y: 1380 ,
        stoneFrame: 6,
        scale: 0.50,
        rotation: 90,
        nextIds: [4],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 4,
        x: 186,
        y: 1200,
        stoneFrame: 7,
        scale: 0.50,
        rotation: 105,
        nextIds: [5],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 5,
        x: 211,
        y: 980,
        stoneFrame: 13,
        scale: 0.50,
        rotation: 90,
        nextIds: [6],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 6,
        x: 250,
        y: 769,
        stoneFrame: 24,
        scale: 0.50,
        rotation: 10,
        nextIds: [7],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 7,
        x: 211,
        y: 590,
        stoneFrame: 29,
        scale: 0.50,
        rotation: 10,
        nextIds: [8],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 8,
        x: 186,
        y: 420,
        stoneFrame: 8,
        scale: 0.50,
        rotation: 90,
        nextIds: [9],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 9,
        x: 225,
        y: 258,
        stoneFrame: 0,
        scale: 0.50,
        rotation: 88,
        nextIds: [10],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 10,
        x: 425,
        y: 180,
        stoneFrame: 7,
        scale: 0.40,
        rotation: 150,
        nextIds: [11],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 11,
        x: 615,
        y: 157,
        stoneFrame: 7,
        scale: 0.40,
        rotation: -30,
        nextIds: [12],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 12,
        x: 825,
        y: 132,
        stoneFrame: 10,
        scale: 0.45,
        rotation: 180,
        nextIds: [13],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 13,
        x: 1020,
        y: 200,
        stoneFrame: 13,
        scale: 0.40,
        rotation: 70,
        nextIds: [14],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 14,
        x: 1097,
        y: 420,
        stoneFrame: 25,
        scale: 0.55,
        rotation: 90,
        nextIds: [15],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 15,
        x: 1128,
        y: 660,
        stoneFrame: 12,
        scale: 0.50,
        rotation: 0,
        nextIds: [16],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 16,
        x: 1108,
        y: 920,
        stoneFrame: 0,
        scale: 0.55,
        rotation: 40,
        nextIds: [17],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 17,
        x: 1106,
        y: 1140,
        stoneFrame: 5,
        scale: 0.45,
        rotation: 15,
        nextIds: [18],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 18,
        x: 1100,
        y: 1330,
        stoneFrame: 27,
        scale: 0.60,
        rotation: 90,
        nextIds: [19],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 19,
        x: 1111,
        y: 1505,
        stoneFrame: 26,
        scale: 0.45,
        rotation: -90,
        nextIds: [20],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 20,
        x: 1070,
        y: 1675,
        stoneFrame: 18,
        scale: 0.60,
        rotation: 90,
        nextIds: [21],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 21,
        x: 1077,
        y: 1800,
        stoneFrame: 26,
        scale: 0.40,
        rotation: -47,
        nextIds: [22],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 22,
        x: 995,
        y: 1919,
        stoneFrame: 27,
        scale: 0.50,
        rotation: 35,
        nextIds: [23],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 23,
        x: 837,
        y: 1915,
        stoneFrame: 29,
        scale: 0.50,
        rotation: 110,
        nextIds: [24],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 24,
        x: 690,
        y: 1869,
        stoneFrame: 28,
        scale: 0.50,
        rotation: 50,
        nextIds: [25],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 25,
        x: 535,
        y: 1935,
        stoneFrame: 23,
        scale: 0.50,
        rotation: 70,
        nextIds: [26],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
    {
        id: 26,
        x: 391,
        y: 1861,
        stoneFrame: 6,
        scale: 0.40,
        rotation: 205,
        nextIds: [1],
        isVisible: true,
        itemNature: ItemNature.NONE,
        itemType: 0
    },
];