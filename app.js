// Firebase config (same for all pages)
const firebaseConfig = {
    apiKey: " ",
    authDomain: " ",
    projectId: " ",
    storageBucket: " ",
    messagingSenderId: " ",
    appId: " "
};

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// LOGIN
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        const declaration = document.getElementById('login-declaration').checked;
        if (!declaration) {
            document.getElementById('error').innerText = "Please accept the declaration.";
            document.getElementById('error').style.color = 'red';
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "welcome.html";
        } catch (error) {
            document.getElementById("error").innerText = "Invalid Username and Password";
            document.getElementById('message').style.color = 'red';
        }
    });
}

// RESET PASSWORD
const resetForm = document.getElementById('resetForm');
if (resetForm) {
    resetForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('reset-email').value.trim();
        try {
            await sendPasswordResetEmail(auth, email);
            document.getElementById('message').innerText = `Password reset link sent to ${email}`;
            document.getElementById('message').style.color = 'green';
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                document.getElementById('message').innerText = 'Invalid email, please sign up first.';
            } else if (error.code === 'auth/invalid-email') {
                document.getElementById('message').innerText = 'Please enter a valid email address.';
            } else {
                document.getElementById('message').innerText = `Error: ${error.message}`;
            }
            document.getElementById('message').style.color = 'red';
        }
    });
}

// REGISTER
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const pnumber = document.getElementById('register-pnumber').value.trim();
        const password = document.getElementById('register-password').value;
        const declaration = document.getElementById('register-declaration').checked;
        if (!declaration) {
            document.getElementById('check').innerText = "Please accept the declaration.";
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            document.getElementById('check').innerText = "Account Created Successfully";
            setTimeout(() => window.location.href = "login.html", 1200);
        } catch (error) {
            document.getElementById('check').innerText = "Error Formed. Please try again!";
        }
    });
}

document.oncontextmenu = () => {
    return false
}

document.onkeydown = e => {
    if(e.key == "F12"){
        return false
    }
    if(e.ctrlKey && e.key == "u"){
        return false
    }
    if(e.ctrlKey && e.key == "c"){
        return false
    }
    if(e.ctrlKey && e.Key == "v"){
        return false
    }
}
