//Authentication.
let userlink = document.getElementById("userlink");
let signoutlink = document.getElementById("signoutlink");
let homePageUploadLink = document.getElementById("homePageUploadBtn");
var currentUser = null;

function getUsername() {
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  if (keepLoggedIn == "yes") {
    currentUser = JSON.parse(localStorage.getItem("user"));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
}

function Signout() {
  sessionStorage.removeItem("user");
  localStorage.removeItem("user");
  localStorage.removeItem("keepLoggedIn");
  window.location = "home.html";
}

window.onload = function () {
  getUsername();
  if (currentUser == null) {
    userlink.innerText = "Sign Up";
    userlink.href = "register.html";

    signoutlink.innerText = "Sign In";
    signoutlink.href = "login.html";

    homePageUploadLink.style.display = "none";
  } else {
    userlink.innerHTML = `<i class="bx bx-user"></i>${currentUser.username}`;
    userlink.href = "#";

    signoutlink.innerText = "Sign Out";
    signoutlink.href = "javascript:Signout()";

    homePageUploadLink.style.display = "inline";
  }
};