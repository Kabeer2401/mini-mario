import { UserStore } from "./storage.js";

const store = new UserStore();

showUserStatus(); /**show user status as soon as the page loads */

export function showUserStatus() {
    const userStatus = document.querySelector("#UserStatus");
    const email = store.getLoggedInUser();
    userStatus.innerHTML = "";
    if (user === undefined) {
        userStatus.textContent = "Not logged in.";
        return;
    }

    //Build new elements with DOM
    const nameText = document.createElement("span");
    nameText.textContent = `Logged in as ${user.name}. `;

    const logOutButton = document.createElement("button");
    logOutButton.type = "button";
    logOutButton.textContent = "Log out";
    logOutButton.onclick = () => {
        store.logOut();
        window.location.href = "index.html";
    };

    userStatus.appendChild(nameText);
    userStatus.appendChild(logOutButton);
} 

//appendchild add each new element inside the userStatus div