//base class for every enemy
export class Enemy extends Phaser.Physics.Arcade.Sprite {
    #startX;
    #distance;

    constructor(scene, x, y, texture, distance, speed) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.#startX = x;
        this.#distance = distance;
        this.body.setAllowGravity(false);
        this.setVelocityX(speed);
    }
    //turns round at either end of the walk
    patrol() {
        if (this.x > this.#startX + this.#distance) {
            this.setVelocityX(-Maths.abs(this.body.velocity.x));
        }
        this.setFlipX(this.body.velocity.x < 0);
    }

    canBeStomped() {
        return true;
    }
}