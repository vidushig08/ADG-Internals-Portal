// JS for Password Visibility
// fa-eye fa-eye-slash
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#loginPass");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the icon
  this.classList.toggle("fa-eye-slash");
});

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAgHtxEJqKVsXItchYAZ8pvCyR38ReYhzQ",
    authDomain: "internals-app-c0391.firebaseapp.com",
    databaseURL: "https://internals-app-c0391.firebaseio.com",
    projectId: "internals-app-c0391",
    storageBucket: "internals-app-c0391.appspot.com",
    messagingSenderId: "754737704023",
    appId: "1:754737704023:web:5ec000ba7b9d08cea48712",
    measurementId: "G-YYZML2JL2J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//Authentication - Firebase - Login 
const auth = firebase.auth();

function login(){
    var loginID = document.getElementById("loginID");
    var loginPass = document.getElementById("loginPass");
    
    const promise = auth.signInWithEmailAndPassword(loginID.value, loginPass.value);
    promise.catch(e => alert(e.message));
}

auth.onAuthStateChanged(function(user){
    if(user){
        window.location.replace("new-meeting.html");
        //is signed in
    }else{   
        alert("User not found");
        //no user is signed in
    }
});

    
function logout(){
  firebase.auth().signOut();
  console.log("signed out");
  window.location.replace("index.html");
}