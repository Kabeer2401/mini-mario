//Validation expressions
const phoneRegex = /^\+[1-9](?:\s?\d){6,14}$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//Check details from registration page to return error message as string or empty string if no errors
export function checkRegistration(details) {
    let errorString = "";

    if (details.name === "") {
        errorString += "Name cannot be empty. ";
    }
    if (details.email === "") {
        errorString += "Email cannot be empty. ";
    } else if (!emailRegex.test(details.email)) {
        errorString += "Please enter a valid email address. ";
    }
    if (details.phone === "") {
        errorString += "Phone number cannot be empty. ";
    } else if (!phoneRegex.test(details.phone)) {
        errorString += "Please enter a valid phone number with country code. ";
    }
    if (details.colour === "") {
        errorString += "Please choose a lantern colour. ";
    }
    if (details.password === "") {
        errorString += "Password cannot be empty. ";
    } else if (!strongPasswordRegex.test(details.password)) {
        errorString += "Password must be at least 8 characters long and include a lower-case letter, a capital letter, a number, and a symbol. ";
    }
    if (details.password !== details.confirm) {
        errorString += "Passwords do not match. ";
    }
    return errorString;
}