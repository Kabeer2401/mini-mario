import { UserStore } from './storage.js';

const store = new UserStore();
const rankingsBody = document.querySelector('#RankingsBody');
const loggedInUser = store.getLoggedInUser();

// Every registered player, sorted from the highest top score to the lowest
const players = store.getUsers();
players.sort((a, b) => b.topScore - a.topScore);

if (players.length === 0) {
    document.querySelector('#NoScores').textContent = 'Nobody has registered yet. Register and play a run to be first!';
}

// Add one table row for each player
players.forEach((player, index) => {
    const row = document.createElement('tr');
    if (loggedInUser !== undefined && player.email === loggedInUser.email) {
        row.className = 'me';
    }
    addCell(row, index + 1);
    addCell(row, player.name);
    addCell(row, player.colour);
    addCell(row, player.topScore);
    rankingsBody.appendChild(row);
});
/** Adds one cell, showing the text as plain text, to the end of a table row. */
function addCell(row, text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    row.appendChild(cell);
}