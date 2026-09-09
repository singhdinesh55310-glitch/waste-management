document.addEventListener("DOMContentLoaded", () => {



const form = document.querySelector(".login-container");



form.addEventListener("submit", (e) => {



e.preventDefault();

const username =

document.getElementById("username").value.trim();

const email =

document.getElementById("email").value.trim();

const phone =

document.getElementById("phone").value.trim();

const password =

document.getElementById("password").value;
const confirmPassword =

document.getElementById("confirmpassword").value;

if (

!username ||

!email ||

!phone ||

!password ||

!confirmPassword

) {

alert("Please fill all fields");

return;

}

if (password !== confirmPassword) {

alert("Passwords do not match");

return;

}

const user = {

username,

email,

phone,

password

};

localStorage.setItem(

"citizenUser",

JSON.stringify(user)

);

alert("Registration Successful");

window.location.href = "CITIZENLOGIN.html";

});
});