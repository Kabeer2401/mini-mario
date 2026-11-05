import { Enemy } from "./Enemy.js";

/** The walking enemy (a crab) that slides along the ground or a ledge. Inherits walking from Enemy. */
export class Slime extends Enemy {
    constructor(scene, x, y, distance) {
        super(scene, x, y, 'enemy-walk', distance, 50);
        this.body.setSize(24, 24);  // the crab only fills the middle of its 48 x 32 frame
        this.body.setOffset(11, 8);
        this.play('enemy-walk');
    }
}