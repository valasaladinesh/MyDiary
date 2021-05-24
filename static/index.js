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
  