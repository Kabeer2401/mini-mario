import { UserStore } from '../storage.js';
import { START_LIVES } from './realms.js';

const TITLE_STYLE = { fontFamily: '"Pixelify Sans", Arial, sans-serif', fontSize: '48px', color: '#ffb347' };
const TEXT_STYLE = { fontFamily: '"Pixelify Sans", Arial, sans-serif', fontSize: '24px', color: '#ffffff' };

/** Shows the final score, saves it if it is the player's best, and offers another run. */
export class EndScene extends Phaser.Scene {
    constructor() {
        super('EndScene');
    }
        create(data) {
        this.sound.stopAll();
        this.add.image(0, 0, 'woods-sky').setOrigin(0, 0);

        // Save the score (only if it beats the player's best) and decide what to tell them
        const store = new UserStore();
        const isNewBest = store.saveScore(data.score);
        const user = store.getLoggedInUser();
        let saveMessage;
        if (user === undefined) {
            saveMessage = 'Log in before you play to save your scores.';
        } else if (isNewBest) {
            saveMessage = 'New best score! It is on the rankings now.';
        } else {
            saveMessage = 'Your best score is still ' + user.topScore + '.';
        }
                let title = 'Your light went out';
        if (data.won) {
            title = 'All three realms are lit!';
            this.sound.play('victory');
        } else {
            this.sound.play('game-over');
        }
                this.add.text(480, 180, title, TITLE_STYLE).setOrigin(0.5);
        this.add.text(480, 250, 'Score: ' + data.score, TEXT_STYLE).setOrigin(0.5);
        this.add.text(480, 290, saveMessage, TEXT_STYLE).setOrigin(0.5);
        this.add.text(480, 380, 'Press SPACE to play again', TEXT_STYLE).setOrigin(0.5);

        // Start a new run from the first realm
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('RealmScene', { realmIndex: 0, score: 0, lives: START_LIVES });
        });
    }
}