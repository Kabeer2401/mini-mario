import { Enemy } from "./Enemy.js";

const SPEED = 40;

//floating enemy with spikes

export class FireSpirit extends Enemy {
    #startY;
    #distance;

    constructor(scene, x, y, distance) {
        super(scene, x, y, 'enemy-danger', distance, 0); // speed 0 so it does not move sideways
        this.#startY = y;
        this.#distance = distance;
        this.body.setSize(24, 22);
        this.body.setOffset(12, 10);
        this.setVelocityY(SPEED);
        this.play('enemy-danger');
    }

    /**overiding enemy patrol; up and down instead of side to side */
    patrol() {
        if (this.y > this.#startY + this.#distance) {
            this.setVelocityY(-SPEED);
        } else if (this.y < this.#startY - this.#distance) {
            this.setVelocityY(SPEED);
        }
    }
    //cannot land on this one
    canBeStomped() {
        return false;
    }
}