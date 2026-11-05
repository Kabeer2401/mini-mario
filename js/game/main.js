import { BootScene } from './BootScene.js';
import { RealmScene } from './RealmScene.js';
import { PauseScene } from './PauseScene.js';
import { EndScene } from './EndScene.js';

// Phaser game settings 
const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'GameArea',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [BootScene, RealmScene, PauseScene, EndScene]
};

//Create game, Phaser starts 1st scene
new Phaser.Game(config);
