import { TILE } from "./realms.js";

const SPEED = 60;

/**
 * platform that slides back and forth or up and down
 * a stilesprite, 1 picture of the mover tile is repeated across its width
 */

export class MovingPlatform extends Phaser.GameObjects.TileSprite {
    #direction;
    #start;
    #distance;

    constructor(scene, x, y, width, distance, direction) {
        super(scene, x, y, width * TILE, TILE, 'mover');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#direction = direction;
        this.#distance = distance;

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);  // the player cannot push it
        this.body.setFrictionX(1);     // it carries the player sideways

        if (direction === 'x') {
            this.#start = x;
            this.body.setVelocityX(SPEED);
        } else {
            this.#start = y;
            this.body.setVelocityY(SPEED);
        }
    }
    move() {
        if (this.#direction === 'x') {
            if (this.x > this.#start + this.#distance) {
                this.body.setVelocityX(-SPEED);
            } else if (this.x < this.#start - this.#distance) {
                this.body.setVelocityX(SPEED);
            }
        } else {
            if (this.y > this.#start + this.#distance) {
                this.body.setVelocityY(-SPEED);
            } else if (this.y < this.#start - this.#distance) {
                this.body.setVelocityY(SPEED);
            }
        }
    }
}