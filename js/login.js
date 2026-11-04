import { UserStore } from "./storage.js";
import { showUserStatus } from "./nav.js";

const store = new UserStore();
const loginPanel = document.querySelector("#LoginPanel");

document.querySelector("#LoginButton").onclick = logIn;

showLoggedIn();


//if someone is logged in, replaces login panel with a message
function showLoggedIn() {
    if (store.getLoggedInUser() !== undefined) {
        loginPanel.innerHTML = "<p>You are already logged in. <a href='game.html'>Play</a> or <a href='rankings.html'>view rankings</a>.</p>";
    }
}

//log user in after checking email and password
function logIn() {
    const email = document.querySelector("#EmailInput").value.trim().toLowerCase();
    const password = document.querySelector("#PasswordInput").value;
    const loginFailure = document.querySelector("#LoginFailure");

    if (email === "" || password === "") {
        loginFailure.innerHTML = "Please enter both email and password.";
        return;
    }

    const user = store.findUser(email);
    if (user === undefined) {
        loginFailure.innerHTML = "This email is not registered. Please register first.";
        return;
    }

    if (user.password !== password) {
        loginFailure.innerHTML = "Incorrect password.";
        return;
    }

    store.logInUser(email);
    showLoggedIn();
    showUserStatus();
}   