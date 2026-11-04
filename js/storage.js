//name of keys 
const USERS_KEY = "glowboundUsers";
const LOGGED_IN_KEY = "glowboundLoggedIn";

//Save account and scores as JSON in local storage
export class UserStorage {
    getUsers() {
        const usersString = localStorage.getItem(USERS_KEY);
        if (usersString === null) {
            return [];
        }
        return JSON.parse(usersString);
    }

//Convert users array to JSON and save in local storage
    #saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    //return email or undefined if none found
    findUser(email) {
        return this.getUsers().find(user => user.email === email);
    }   

//Add new user with top score of 0
    addUser(newUser) {
        const users = this.getUsers();
        users.push(newUser);
        this.#saveUsers(users);
    }

//Remember logged in user 
    logInUser(email) {
        sessionStorage.setItem(LOGGED_IN_KEY, email);
}

//Get logged in user
    getLoggedInUser() {
        return sessionStorage.getItem(LOGGED_IN_KEY);
}

//return logged in or undefined
    getLoggedInUser() {
        const email = sessionStorage.getItem(LOGGED_IN_KEY);
        if (email === null) {
            return undefined;
        }
        return email;
    }

//Save new score for user if it is higher than previous score and return true if score is new top score
    saveScore(score) {
        const email = sessionStorage.getItem(LOGGED_IN_KEY);
        const users = this.getUsers();
        const user = users.find(person => person.email === email);
        if (user === undefined || score <= user.topScore) {
            return false;
        }
        user.topScore = score;
        this.#saveUsers(users);
        return true;
    }
}