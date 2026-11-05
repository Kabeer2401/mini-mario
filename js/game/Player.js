import { COLOURS } from "./realms.js";

const RUN_SPEED = 200;
const JUMP_SPEED = -480;
const SAFE_TIME = 1500; //Milliseconds

/**Moves character with arrows and plays its sprite-animations. */
export class Player extends Phaser.Physics.Arcade.Sprite {
    #tint;
    #startX;
    #startY;
    #safeUntil = 0;

    constructor(scene, x, y, colour) {
        super(scene, x, y, 'hero-idle');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#tint = COLOURS[colour];
        this.#startX = x;
        this.#startY = y;
        this.setTint(this.#tint);

        //since hero is smaller than its frame, physics body is made smaller

        this.body.setSize(12, 36);
        this.body.setOffset(34, 28);
        this.setCollideWorldBounds(true);
    }
        //move player from arrow keys

    move(cursors) {
        if (cursors.left.isDown) {
            this.setVelocityX(-RUN_SPEED);
            this.setFlipX(true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(RUN_SPEED);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        const onGround = this.body.touching.down;
        if (cursors.up.isDown && onGround) {
            this.setVelocityY(JUMP_SPEED);
            this.scene.sound.play('jump');
        }
                // Choose the animation for what the player is doing
        if (!onGround && this.body.velocity.y < 0) {
            this.anims.play('hero-jump', true);
        } else if (!onGround) {
            this.anims.play('hero-fall', true);
        } else if (this.body.velocity.x !== 0) {
            this.anims.play('hero-run', true);
        } else {
            this.anims.play('hero-idle', true);
        }
    }
        /** True for a short time after losing a life, while the player flashes red. */
    isSafe() {
        return this.scene.time.now < this.#safeUntil;
    }

    /** Sends the player back to the start of the realm, flashing red, then back to its lantern colour. */
    respawn() {
        this.#safeUntil = this.scene.time.now + SAFE_TIME;
        this.setPosition(this.#startX, this.#startY);
        this.setVelocity(0, 0);
        this.setTint(0xff6666);
        this.scene.time.delayedCall(SAFE_TIME, () => this.setTint(this.#tint));
    }
}
    
    
