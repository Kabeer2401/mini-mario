import { UserStore } from "./storage.js";
import { checkRegistration } from "./validation.js";

const store = new UserStore();

//Run registerUser when button is clicked
document.querySelector("#registerButton").onclick = registerUser;

//Check details and if valid, add user to local storage and redirect to login page
function registerUser() {
    //Extract data from the field inputs 
    const details = {
        name: document.querySelector("#nameInput").value.trim(),
        email: document.querySelector("#emailInput").value.trim().toLowerCase(),
        phone: document.querySelector("#phoneInput").value.trim(),
        colour: document.querySelector("#colourInput").value,
        password: document.querySelector("#passwordInput").value,
        confirm: document.querySelector("#confirmInput").value
    };
    // Reset feedback from any earlier attempt
    const feedbackPara = document.querySelector("#feedbackPara");
    feedbackPara.className = "feedback";
    feedbackPara.innerHTML = "";
    //Check details then check if email is already registered
    let errorString = checkRegistration(details);
    if (errorString === "" && store.findUser(details.email) !== undefined) {
        errorString = "This email is already registered. Please log in.";
    }
    if (errorString.length > 0) {
        feedbackPara.innerHTML = errorString;
        return;
    }

    //Build object to store password as    
    const newUser = {
        name: details.name,
        email: details.email,
        phone: details.phone,
        colour: details.colour,
        password: details.password,
    };
    store.addUser(newUser);

    //Inform user of result
    feedbackPara.className = "feedback success";
    feedbackPara.innerHTML = "<p>Registration successful. You can now <a href='login.html'>log in</a>.</p>";
}