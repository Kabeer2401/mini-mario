import { UserStore } from "./storage.js";
import { checkRegistration } from "./validation.js";

const store = new UserStore();

//Run registerUser when button is clicked
document.querySelector("#RegisterButton").onclick = registerUser;

//Check details and if valid, add user to local storage and show success
function registerUser() {
    //Extract data from the field inputs 
    const details = {
        name: document.querySelector("#NameInput").value.trim(),
        email: document.querySelector("#EmailInput").value.trim().toLowerCase(),
        phone: document.querySelector("#PhoneInput").value.trim(),
        colour: document.querySelector("#ColourInput").value,
        password: document.querySelector("#PasswordInput").value,
        confirm: document.querySelector("#ConfirmInput").value
    };
    // Reset feedback from any earlier attempt
    const feedbackPara = document.querySelector("#FeedbackPara");
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

    //Build object to store     
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