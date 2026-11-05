import { REALMS, START_LIVES } from "./realms.js";
/**loads every image and sound, creates the animations then starts the first realm */

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }
    preload() {
        this.add.text(480, 270, 'Lighting the lanterns...', { fontSize: '28px', color:'#ffb347' }).setOrigin(0.5);
        
        this.load.spritesheet('hero-idle', 'images/sprites/hero-idle.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('hero-run', 'images/sprites/hero-run.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('hero-jump', 'images/sprites/hero-jump.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('enemy-walk', 'images/sprites/enemy-walk.png', { frameWidth: 48, frameHeight: 32 });
        this.load.spritesheet('enemy-fly', 'images/sprites/enemy-fly.png', { frameWidth: 28, frameHeight: 37 });
        this.load.spritesheet('enemy-danger', 'images/sprites/enemy-danger.png', { frameWidth: 47, frameHeight: 32 });
        this.load.spritesheet('ember', 'images/sprites/ember.png', { frameWidth: 23, frameHeight: 21 });
        this.load.image('portal', 'images/sprites/portal.png');
        this.load.image('darkness', 'images/sprites/darkness.png');

        // Tiles and backgrounds: each realm has its own, named after the realm's key
        REALMS.forEach(realm => {
            const key = realm.key;
            this.load.image(key + '-top', 'images/tiles/' + key + '-top.png');
            this.load.image(key + '-fill', 'images/tiles/' + key + '-fill.png');
            ['sky', 'far'].forEach(layer => {
                this.load.image(key + '-' + layer, 'images/backgrounds/' + key + '-' + layer + '.png');
            });
            this.load.audio('music-' + key, 'sounds/music-' + key + '.mp3');
        });
        this.load.image('mover', 'images/tiles/mover.png');
        this.load.image('spikes', 'images/tiles/spikes.png');
        this.load.image('lava', 'images/tiles/lava.png');

        // Sound effects
        ['jump', 'ember', 'stomp', 'hurt', 'portal', 'level-complete', 'game-over', 'victory', 'select'].forEach(name => {
            this.load.audio(name, 'sounds/' + name + '.mp3');
        });
    }

    create() {
    // The hero's animations. Each one has its own strip of frames.
    this.anims.create({
        key: 'hero-idle',
        frames: this.anims.generateFrameNumbers('hero-idle', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
    });
    this.anims.create({
        key: 'hero-run',
        frames: this.anims.generateFrameNumbers('hero-run', { start: 0, end: 9 }),
        frameRate: 12,
        repeat: -1
    });
    this.anims.create({
        key: 'hero-jump',
        frames: this.anims.generateFrameNumbers('hero-jump', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'hero-fall',
        frames: this.anims.generateFrameNumbers('hero-jump', { start: 2, end: 5 }),
        frameRate: 10,
        repeat: -1
    });


        // Enemies and embers
        this.anims.create({
            key: 'enemy-walk',
            frames: this.anims.generateFrameNumbers('enemy-walk', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy-fly',
            frames: this.anims.generateFrameNumbers('enemy-fly', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy-danger',
            frames: this.anims.generateFrameNumbers('enemy-danger', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'ember-spin',
            frames: this.anims.generateFrameNumbers('ember', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

                this.scene.start('RealmScene', { realmIndex: 0, score: 0, lives: START_LIVES });
    }
}