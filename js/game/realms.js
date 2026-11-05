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
 * width: how many tiles wide the realm is (30 tiles fill one screen)
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
        width: 30,
        ground: [[0, 9], [13, 20], [24, 29]],
        ledges: [[4, 12, 3], [10, 11, 3], [16, 12, 2], [19, 10, 3], [25, 12, 3]],
        embers: [
            [2, 14], [5, 11], [6, 11], [11, 10], [12, 10],
            [17, 11], [20, 9], [21, 9], [22, 12], [26, 11]
        ],
        enemies: [['slime', 7, 14, 48], ['slime', 16, 14, 64], ['slime', 27, 14, 32]],
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
        width: 45,
        ground: [[0, 7], [12, 18], [23, 27], [33, 38], [42, 44]],
        ledges: [[3, 12, 3], [9, 10, 2], [14, 12, 3], [20, 11, 2], [24, 12, 2], [34, 12, 3], [39, 10, 2]],
        embers: [
            [2, 14], [4, 11], [5, 11], [9, 9], [10, 9], [13, 14], [15, 11],
            [20, 10], [21, 10], [24, 11], [30, 12], [35, 11], [39, 9], [40, 9]
        ],
        enemies: [['bat', 10, 8, 48], ['bat', 21, 8, 64], ['slime', 25, 14, 48], ['bat', 30, 10, 64], ['bat', 40, 7, 48]],
        movers: [[29, 13, 3, 48, 'x']],
        spikes: [[5, 5], [15, 16], [36, 36]],
        lava: [],
        portal: 43
    },
    {
        name: 'Molten Core',
        tagline: 'Keep moving. The floor is lava.',
        key: 'core',
        darkness: 0.7,
        width: 60,
        ground: [[0, 6], [11, 15], [21, 24], [30, 34], [41, 44], [50, 53], [57, 59]],
        ledges: [[3, 12, 3], [8, 11, 2], [12, 12, 2], [18, 12, 2], [31, 12, 2], [42, 12, 2], [51, 12, 2]],
        embers: [
            [2, 14], [4, 11], [8, 10], [9, 10], [11, 14], [12, 11], [18, 11], [19, 11], [21, 14],
            [26, 10], [27, 10], [30, 14], [32, 11], [37, 12], [39, 12], [43, 11], [47, 10], [51, 11]
        ],
        enemies: [
            ['spirit', 9, 8, 32], ['spirit', 18, 7, 32], ['spirit', 27, 8, 48],
            ['spirit', 38, 9, 48], ['slime', 42, 14, 32], ['spirit', 48, 8, 48]
        ],
        movers: [[26, 12, 2, 48, 'y'], [36, 13, 3, 64, 'x'], [46, 12, 2, 64, 'y']],
        spikes: [[13, 13], [23, 23], [33, 33], [52, 52]],
        lava: [[7, 10], [16, 20], [25, 29], [35, 40], [45, 49], [54, 56]],
        portal: 58
    }
];