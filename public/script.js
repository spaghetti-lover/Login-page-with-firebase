import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCe_185Zi7weXhX5G7GAnXMRbawmJH8f8",
  authDomain: "learn-firebase-45c9a.firebaseapp.com",
  databaseURL:
    "https://learn-firebase-45c9a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "learn-firebase-45c9a",
  storageBucket: "learn-firebase-45c9a.appspot.com",
  messagingSenderId: "634551919840",
  appId: "1:634551919840:web:b4db849806992577f89c85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Initialize Firebase Auth

const pass_field = document.querySelector(".pass-key");
const showBtn = document.querySelector(".show");
showBtn.addEventListener("click", function () {
  if (pass_field.type === "password") {
    pass_field.type = "text";
    showBtn.textContent = "HIDE";
    showBtn.style.color = "#3498db";
  } else {
    pass_field.type = "password";
    showBtn.textContent = "SHOW";
    showBtn.style.color = "#222";
  }
});

const loginGoogle = document.querySelector(".google");
loginGoogle.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Đăng nhập bằng Google");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

const formLogin = document.querySelector(".form-login");

//Login
if (formLogin) {
  formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.log("Mật khẩu không đúng");
      });
  });
}

// Reset password+
const formForgotPassword = document.querySelector(".pass");
formForgotPassword.addEventListener("click", () => {
  const emailInput = document.querySelector("#email");
  const email = emailInput.value;
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email reset password was sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
});

//Register
const formRegister = document.querySelector(".form-register");
if (formRegister) {
  formRegister.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          alert("Tạo tài khoản thành công");
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
