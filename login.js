document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelector(".login-container");

form.addEventListener("submit", (e) => {

e.preventDefault();

const phone =

document.getElementById("phone").value.trim();

const password =

document.getElementById("password").value;

const user =

JSON.parse(localStorage.getItem("citizenUser"));

if (
user &&

user.phone === phone &&

user.password === password

) {

alert("Login Successful");

window.location.href = "dashboard.html";

} else {

alert("Invalid Credentials");

}

});
});
