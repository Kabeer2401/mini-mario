export const START_LIVES = 3;

/**Game is 30 tiles wide and 17 tiles high(960x540). 1 tile = 32x32 pixels */
export const TILE = 32;

/**Lantern colours and tint */
export const COLOURS = { Ember: 0xffb070, Tide: 0x70d0ff, Moss: 0xa0f070, Violet: 0xffffff };

/**
 * the 3 realms, in the order they are played. Positions are in tiles:
 * column 0 is left edge, row 0 is top, and ground always on row 15
 * key:start of realm's tile, background and music file
 * darkness: 0 no darkness & 1 black
 * ground: [FirstColumn, LastColumn] for each stretch of ground, gaps between are pits
 * ledges: [Column, Row, Width] each floating ledge
 * embers: [column, row] 
 * enemies: [type('slime/bat/spirit'), column, row, distance]
 * movers: [column, row, width, distance, direction] direction is 'x' (side to side) or 'y'(up and down)
 * spikes: [firstColumn, lastColumn ] for each row of spikes on the ground
 * lava: [firstColumn, lastColumn] for each pool of lava
 * portal: the column where the portal stands on the ground
 */
export const REALMS = [
    {
        name: 'Whispering Woods',
        tagline: 'Follow the embers through the dusk.',
        key: 'woods',
        darkness: 0,
        ground: [[0, 8], [12, 19], [23,29]],
        ledges: [[3, 12, 3], [9, 10, 3], [15, 12, 3], [20, 9, 3], [25, 12, 3]],
        embers: [
            [4, 11], [5, 11], [10, 9], [11, 9], [10, 13],
            [16, 11], [17, 11], [21, 8], [22, 8], [26, 11]
        ],
        enemies: [['slime', 6, 14, 48], ['slime', 16, 14, 64], ['slime', 16, 11, 24], ['slime', 26, 14, 48]],
        movers: [],
        spikes: [],
        lava: [],
        portal: 28
    },
        {
        name: 'Crystal Caverns',
        tagline: 'Only your lantern lights the way.',
        key: 'caves',
        darkness: 0.8,
        ground: [[0, 7], [16, 29]],
        ledges: [[2, 12, 3], [18, 12, 3], [22, 9, 3], [26, 12, 3]],
        embers: [
            [2, 11], [3, 11], [8, 12], [11, 11], [14, 12],
            [19, 11], [23, 8], [24, 8], [27, 11], [24, 13]
        ],
        enemies: [['bat', 12, 9, 96], ['bat', 24, 6, 64], ['slime', 24, 14, 64]],
        movers: [[9, 13, 3, 64, 'x']],
        spikes: [[4, 5], [20, 21]],
        lava: [],
        portal: 28
    },
        {
        name: 'Molten Core',
        tagline: 'Keep moving. The floor is lava.',
        key: 'core',
        darkness: 0.7,
        ground: [[0, 6], [11, 17], [24, 29]],
        ledges: [[3, 12, 3], [13, 12, 3], [25, 12, 3]],
        embers: [
            [4, 11], [5, 11], [8, 12], [9, 12], [14, 11],
            [15, 11], [20, 9], [21, 9], [26, 11], [27, 11]
        ],
        enemies: [['spirit', 9, 9, 32], ['slime', 14, 14, 48], ['spirit', 27, 7, 48]],
        movers: [[19, 12, 3, 80, 'y']],
        spikes: [],
        lava: [[7, 10], [18, 23]],
        portal: 28
    }
];