
window.onload = function () {
    var myInput = document.getElementById("password");
    var status = document.getElementById("pwd");

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function () {
        document.getElementById("pwd").style.display = "block";
    }

    // When the user clicks outside of the password field, hide the message box
    myInput.onblur = function () {
        document.getElementById("pwd").style.display = "none";
    }

    // When the user starts to type something inside the password field

    if (myInput != null) {
        myInput.onkeyup = function () {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            // Validate numbers
            var numbers = /[0-9]/g;
            if (myInput.value.match(upperCaseLetters) && myInput.value.match(lowerCaseLetters) && myInput.value.match(numbers) && myInput.value.length >= 8) {
                status.classList.remove("invalid");
                status.classList.add("valid");
                status.innerHTML = "Password is valid"
            } else {
                status.classList.remove("valid");
                status.classList.add("invalid");
                status.innerHTML = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            }
        }
    }
}

function loadLogin() {
    console.log("loadLogin");
    let loginForm = document.getElementById("loginform");
    let registerForm = document.getElementById("registerform");
    let registernow = document.getElementById("registernow");
    let login = document.getElementById("login");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    registernow.style.backgroundColor = 'black';
    login.style.backgroundColor = 'rgb(75, 73, 73)';
}
  
function loadRegistration() {
    console.log("loadRegistration");
    let loginForm = document.getElementById("loginform");
    let registerForm = document.getElementById("registerform");
    let registernow = document.getElementById("registernow");
    let login = document.getElementById("login");
    registerForm.style.display = "block";
    loginForm.style.display = "none";
    login.style.backgroundColor = 'black';
    registernow.style.backgroundColor = 'rgb(75, 73, 73)';
}
  