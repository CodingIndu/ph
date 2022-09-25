import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ_UlxCiyruWOCQHtjd8fP-ZDH_DXsTTU",
  authDomain: "my-web-b5191.firebaseapp.com",
  databaseURL: "https://my-web-b5191-default-rtdb.firebaseio.com",
  projectId: "my-web-b5191",
  storageBucket: "my-web-b5191.appspot.com",
  messagingSenderId: "802813018634",
  appId: "1:802813018634:web:02dc473e875ff7fb7395f3",
  measurementId: "G-ZF2GT2TL7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const db = getDatabase();

const username = document.getElementById("userInp");
const pass = document.getElementById("passInp");
const submit = document.getElementById("sub_btn");

function AuthinticateUser() {
  const dbRef = ref(db);

  get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
    if (snapshot.exists()) {
      let dbpass = decPass(snapshot.val().password);
      if (dbpass == pass.value) {
        login(snapshot.val());
      } else {
        alert("-User does not exsit\n-Check your Password and Username");
      }
    } else {
      set(ref(db, "UsersList/" + username.value), {
        fullname: name.value,
        email: email.value,
        username: username.value,
        password: encPass(),
      })
        .then(() => {
          alert("User added succesfully");
        })
        .catch((error) => {
          alert("error" + error);
        });
    }
  });
}

function decPass(dbpass) {
  var pass12 = CryptoJS.AES.decrypt(dbpass, pass.value);
  return pass12.toString(CryptoJS.enc.Utf8);
}

function login(user) {
  let keepLoggedIn = document.getElementById("flexSwitchCheckChecked").checked;

  if (!keepLoggedIn) {
    sessionStorage.setItem("user", JSON.stringify(user));
    window.location = "home.html";
  } else {
    localStorage.setItem("keepLoggedIn", "yes");
    localStorage.setItem("user", JSON.stringify(user));
    window.location = "home.html";
  }
}

submit.addEventListener("click", AuthinticateUser);
