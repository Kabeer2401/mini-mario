const TITLE_STYLE = { fontFamily: '"Pixelify Sans", Arial, sans-serif', fontSize: '48px', color: '#ffb347' };
const TEXT_STYLE = { fontFamily: '"Pixelify Sans", Arial, sans-serif', fontSize: '24px', color: '#ffffff' };

/** Shown on top of the realm while the game is paused. */
export class PauseScene extends Phaser.Scene {
    constructor() {
        super('PauseScene');
    }
        create() {
        this.add.rectangle(480, 270, 960, 540, 0x07051a, 0.7);
        this.add.text(480, 240, 'Paused', TITLE_STYLE).setOrigin(0.5);
        this.add.text(480, 300, 'Press P to carry on', TEXT_STYLE).setOrigin(0.5);

        // P again: carry on with the realm and close this scene
        this.input.keyboard.once('keydown-P', () => {
            this.sound.resumeAll();
            this.sound.play('select');
            this.scene.resume('RealmScene');
            this.scene.stop();
        });
    }
}
