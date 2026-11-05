import { Enemy } from "./Enemy.js";

/** The flying enemy that flies back and forth, bobbing up and down as it goes. */
export class Bat extends Enemy {
    constructor(scene, x, y, distance) {
        super(scene, x, y, 'enemy-fly', distance, 80);
        this.body.setSize(18, 24);
        this.body.setOffset(5, 6);
        this.play('enemy-fly');
    }
        /** Overrides Enemy's patrol: walks the same path, then adds a bob up and down. */
    patrol() {
        super.patrol();
        this.setVelocityY(Math.sin(this.scene.time.now / 200) * 60);
    }
}