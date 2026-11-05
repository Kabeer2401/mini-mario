const FONT = '"Pixelify Sans", Arial, sans-serif';
const TEXT_STYLE = { fontFamily: FONT, fontSize: '22px', color: '#ffffff', stroke: '#0c1d38', strokeThickness: 4 };
const MESSAGE_STYLE = { fontFamily: FONT, fontSize: '26px', color: '#ffb347', stroke: '#0c1d38', strokeThickness: 5 };
const TITLE_STYLE = { fontFamily: FONT, fontSize: '48px', color: '#ffb347', stroke: '#0c1d38', strokeThickness: 6 };
const MESSAGE_TIME = 2500; 

/** text drawn over game; scores, lives etc... */
export class Hud {
    #scene;
    #scoreText;
    #livesText;
    #embersText;
    #messageText;

    constructor(scene, realmName) {
        this.#scene = scene;
        this.#scoreText = scene.add.text(16, 12, '', TEXT_STYLE).setScrollFactor(0);
        this.#livesText = scene.add.text(16, 40, '', TEXT_STYLE).setScrollFactor(0);
        this.#embersText = scene.add.text(944, 40, '', TEXT_STYLE).setOrigin(1, 0).setScrollFactor(0);
        scene.add.text(944, 12, realmName, TEXT_STYLE).setOrigin(1, 0).setScrollFactor(0);
        scene.add.text(944, 512, 'P: pause', TEXT_STYLE).setOrigin(1, 0.5).setScrollFactor(0);
        this.#messageText = scene.add.text(480, 110, '', MESSAGE_STYLE).setOrigin(0.5).setScrollFactor(0);
    }

    /**Shows latest numbers */
    update(score, lives, embersLeft) {
        this.#scoreText.setText('Score: ' + score);
        this.#livesText.setText('Lives: ' + lives);
        this.#embersText.setText('Embers left: ' + embersLeft);
    }

    /**shows message mid screen for a few secs */
    showMessage(text) {
        this.#messageText.setText(text);
        this.#scene.time.delayedCall(MESSAGE_TIME, () => this.#messageText.setText(''));
    }

    /**show title card when realm starts then removes it */
    showTitle(number, name, tagline) {
        const title = this.#scene.add.text(480, 220, number + '. ' + name, TITLE_STYLE).setOrigin(0.5).setScrollFactor(0);
        const subtitle = this.#scene.add.text(480, 280, tagline, MESSAGE_STYLE).setOrigin(0.5).setScrollFactor(0);
        this.#scene.time.delayedCall(MESSAGE_TIME, () => {
            title.destroy();
            subtitle.destroy();
        });
    }
}