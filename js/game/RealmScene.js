import { REALMS, TILE } from "./realms.js";
import { UserStore } from "../storage.js";
import { Player } from "./Player.js";
import { Slime } from "./Slime.js";
import { Bat } from "./Bat.js";
import { FireSpirit } from "./FireSpirit.js";
import { MovingPlatform } from "./MovingPlatform.js";
import { Hud } from "./Hud.js";

const EMBER_POINTS = 10;
const STOMP_POINTS = 50;
const REALM_BONUS = 100;
const GROUND_ROW = 15;
const HALF = TILE / 2; //adding 1/2 a tile puts an obj in the middle of its tile

/** Plays one realm and the same scene is restarted with new data for each realm */
export class RealmScene extends Phaser.Scene {
    #realm;
    #realmIndex;
    #score;
    #lives;
    #portalOpen;
    #leaving;
    #platforms;
    #hazards;
    #movers;
    #portal;
    #embers;
    #enemies;
    #player;
    #darkness;
    #cursors;
    #hud;

    constructor() {
        super('RealmScene');
    }

    /**Receives the realm number, score and lives from the scene that started this one. */
    init(data) {
        this.#realmIndex = data.realmIndex;
        this.#score = data.score;
        this.#lives = data.lives;
        this.#realm = REALMS[this.#realmIndex];
        this.#portalOpen = false;
        this.#leaving = false;
    }

    /**Builds the realm. Things are drawn in the order they are added, back to front. */
    create() {
        this.#addBackground();
        this.#addPlatforms();
        this.#addHazards();
        this.#addMovers();
        this.#addPortal();
        this.#addEmbers();
        this.#addEnemies();
        this.#addPlayer();
        this.#addCollisions();
        this.#followPlayer();
        this.#addDarkness();
        this.#playMusic();

        this.#hud = new Hud(this, this.#realm.name);
        this.#hud.showTitle(this.#realmIndex + 1, this.#realm.name, this.#realm.tagline);
        this.#updateHud();

        this.#cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-P', this.#pause, this);
    }
    /** Runs every frame. */
    update() {
        if (this.#leaving) {
            return;
        }
        this.#player.move(this.#cursors);
        this.#enemies.forEach(enemy => enemy.patrol());
        this.#movers.forEach(mover => mover.move());

        //The darkness follows the player, so the light is always around them
        if (this.#darkness !== null) {
            this.#darkness.setPosition(this.#player.x, this.#player.y);
        }

        //Falling into a pit always costs a life
        if (this.#player.y > 600) {
            this.#takeLife();
        }
    }

    /**2 Background pictures: sky at back, then the trees or rocks in front of it and setScrollFactor(0) keeps the picture still while the camera moves */
    #addBackground() {
        ['sky', 'far'].forEach(layer => {
            this.add.image(0, 0, this.#realm.key + '-' + layer).setOrigin(0, 0).setScrollFactor(0);
        });
    }
    /**the ground and the ledges, built from tiles that never move. */
    #addPlatforms() {
        const key = this.#realm.key;
        this.#platforms = this.physics.add.staticGroup();

        //Ground: a top tile on row 15 with a fill tile underneath it
        this.#realm.ground.forEach(([first, last]) => {
            for (let column = first; column <= last; column++) {
                this.#platforms.create(column * TILE + HALF, GROUND_ROW * TILE + HALF, key + '-top');
                this.#platforms.create(column * TILE + HALF, (GROUND_ROW +1) * TILE + HALF, key + '-fill');
            }
        });

        //Ledges: a row of top tiles
        this.#realm.ledges.forEach(([column, row, width]) => {
            for (let i = 0; i < width; i++) {
                this.#platforms.create((column + i) * TILE + HALF, row * TILE + HALF, key + '-top');
            }
        });

                // The world is as wide as the realm. The player can fall out of the bottom, but not off the sides or top
        this.physics.world.setBounds(0, 0, this.#realm.width * TILE, 540, true, true, true, false);
    }

    /** Spikes on the ground and pools of lava */
    #addHazards() {
        this.#hazards = this.physics.add.staticGroup();
        this.#realm.spikes.forEach(([first, last]) => {
            for (let column = first; column <= last; column++) {
                this.#hazards.create(column * TILE + HALF, GROUND_ROW * TimeRanges - 8, 'spikes');
            }
        });
        this.#realm.lava.forEach(([first, last]) => {
            for (let column = first; column <= last; column++) {
                this.#hazards.create(column * TILE + HALF, GROUND_ROW * TILE + 42, 'lava');
            }
        });
    }

        /** Moving platforms */
    #addMovers() {
        this.#movers = [];
        this.#realm.movers.forEach(([column, row, width, distance, direction]) => {
            const x = column * TILE + width * HALF; // the middle of the whole platform
            const y = row * TILE + HALF;
            this.#movers.push(new MovingPlatform(this, x, y, width, distance, direction));
        });
    }

        /** The portal: dim and closed until every ember is collected. */
    #addPortal() {
        const x = this.#realm.portal * TILE + HALF;
        const y = GROUND_ROW * TILE - 24; // the portal is 48 pixels tall and stands on the ground
        this.#portal = this.physics.add.staticSprite(x, y, 'portal').setAlpha(0.4);
    }

        /** Embers float in place until they are collected. */
    #addEmbers() {
        this.#embers = this.physics.add.group({ allowGravity: false });
        this.#realm.embers.forEach(([column, row]) => {
            const ember = this.#embers.create(column * TILE + HALF, row * TILE + HALF, 'ember');
            ember.play('ember-spin');
        });
    }

        /** Creates an object of the right class for each enemy. */
    #addEnemies() {
        this.#enemies = [];
        this.#realm.enemies.forEach(([type, column, row, distance]) => {
            const x = column * TILE + HALF;
            const y = row * TILE + HALF;
            if (type === 'slime') {
                this.#enemies.push(new Slime(this, x, y, distance));
            } else if (type === 'bat') {
                this.#enemies.push(new Bat(this, x, y, distance));
            } else {
                this.#enemies.push(new FireSpirit(this, x, y, distance));
            }
        });
    }

        /** The hero, in the lantern colour the logged-in player chose. */
    #addPlayer() {
        let colour = 'Ember';
        const user = new UserStore().getLoggedInUser();
        if (user !== undefined) {
            colour = user.colour;
        }
        // The hero's feet are 24 pixels below the middle of its 80 x 80 frame, so this stands it on the ground
        this.#player = new Player(this, 1 * TILE + HALF, GROUND_ROW * TILE - 24, colour);
    }
        /** The camera follows the player, but never shows past the edges of the realm (Phaser: Cameras). */
    #followPlayer() {
        this.cameras.main.setBounds(0, 0, this.#realm.width * TILE, 540);
        this.cameras.main.startFollow(this.#player);
    }

        /** Tells Phaser what happens when things touch (Phaser tutorial, parts 6, 8 and 9). */
    #addCollisions() {
        this.physics.add.collider(this.#player, this.#platforms);
        this.physics.add.collider(this.#player, this.#movers);
        this.physics.add.overlap(this.#player, this.#embers, this.#collectEmber, null, this);
        this.physics.add.overlap(this.#player, this.#hazards, this.#hurtPlayer, null, this);
        this.physics.add.overlap(this.#player, this.#enemies, this.#touchEnemy, null, this);
        this.physics.add.overlap(this.#player, this.#portal, this.#enterPortal, null, this);
    }

        /** Dark realms are covered by a dark picture with a hole of light in the middle. */
    #addDarkness() {
        this.#darkness = null;
        if (this.#realm.darkness > 0) {
            this.#darkness = this.add.image(this.#player.x, this.#player.y, 'darkness');
            this.#darkness.setAlpha(this.#realm.darkness);
        }
    }

        /** Stops the last realm's music and loops this realm's music. */
    #playMusic() {
        this.sound.stopAll();
        const music = this.sound.add('music-' + this.#realm.key, { loop: true, volume: 0.4 });
        music.play();
    }

        /** Called when the player touches an ember. */
    #collectEmber(player, ember) {
        ember.disableBody(true, true);
        this.#score += EMBER_POINTS;
        this.sound.play('ember');
        if (this.#embers.countActive(true) === 0) {
            this.#openPortal();
        }
        this.#updateHud();
    }

    /** Lights up the portal once every ember is collected. */
    #openPortal() {
        this.#portalOpen = true;
        this.#portal.setAlpha(1);
        this.sound.play('portal');
        this.#hud.showMessage('The portal is open!');
    }

        /** Landing on top of an enemy defeats it, unless it is a fire spirit. Any other touch costs a life. */
    #touchEnemy(player, enemy) {
        // Falling, with feet no more than 10 pixels into the top of the enemy
        const landedOnTop = player.body.velocity.y > 0 && player.body.bottom < enemy.body.top + 10;
        if (landedOnTop && enemy.canBeStomped()) {
            enemy.disableBody(true, true);
            player.setVelocityY(-300);
            this.#score += STOMP_POINTS;
            this.sound.play('stomp');
            this.#updateHud();
        } else {
            this.#hurtPlayer();
        }
    }

        /** Hazards and enemies cost a life, unless the player is still flashing from the last hit. */
    #hurtPlayer() {
        if (this.#leaving || this.#player.isSafe()) {
            return;
        }
        this.#takeLife();
    }

    /** Takes one life, sends the player back to the start, and ends the run at 0 lives. */
    #takeLife() {
        this.#lives -= 1;
        this.#player.respawn();
        this.sound.play('hurt');
        this.#updateHud();
        if (this.#lives === 0) {
            this.#endRun(false);
        }
    }

        /** Moves on to the next realm, or ends the run after the last one. */
    #enterPortal() {
        if (!this.#portalOpen || this.#leaving) {
            return;
        }
        this.#score += REALM_BONUS;
        const nextIndex = this.#realmIndex + 1;
        if (nextIndex < REALMS.length) {
            this.#lives += 1;
            this.#updateHud();
            this.#hud.showMessage('Realm complete ! +1 life');
            this.#leaving = true;
            this.physics.pause();
            this.#player.setVisible(false);
            this.sound.play('level-complete');
            this.time.delayedCall(1200, () => {
                this.scene.restart({ realmIndex: nextIndex, score: this.#score, lives: this.#lives });
            });
        } else {
            this.#endRun(true);
        }
    }

    /** Freezes the realm, then shows the end screen. */
    #endRun(won) {
        this.#leaving = true;
        this.physics.pause();
        this.time.delayedCall(1000, () => {
            this.scene.start('EndScene', { score: this.#score, won: won });
        });
    }

        /** Opens the pause screen on top of this scene and pauses this one (Phaser docs: Scenes). */
    #pause() {
        if (this.#leaving) {
            return;
        }
        this.sound.pauseAll();
        this.sound.play('select');
        this.scene.launch('PauseScene');
        this.scene.pause();
    }

    /** Shows the latest score, lives and embers left. */
    #updateHud() {
        this.#hud.update(this.#score, this.#lives, this.#embers.countActive(true));
    }
}