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
    apiKey: "AIzaSyATTBiIr3ejGcjXlpLz_mIFV-D3uTv_hnU",
    authDomain: "internal-demo-f3701.firebaseapp.com",
    databaseURL: "https://internal-demo-f3701-default-rtdb.firebaseio.com",
    projectId: "internal-demo-f3701",
    storageBucket: "internal-demo-f3701.appspot.com",
    messagingSenderId: "981293967243",
    appId: "1:981293967243:web:3f3d4c137d12018cb3b18e",
    measurementId: "G-GMC40LHFBJ"
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
        alert('hi');
        //window.location.replace("new-meeting.html");
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
/*
//Test Code
firebase.database().ref('Users/' + uid + '/isAdmin').on('value', (snapshot)=>{
  console.log(snapshot.val())
})


var fb = firebase.database.ref();

/**
 * @param {string} loginID
 * @return {Object} the object contains zero or more user records, the keys are the users' ids
 */
/*
function findUsersMatchingEmail( loginID, callback ) {
    fb.child('Users').orderByChild('email').equalTo(loginID).once('value', function(snap) {
        callback( snap.val() );
    });
}

*/

// var ref = firebase.database().ref();

// ref.on("value", function(snapshot) {
//    console.log(snapshot.val());
// }, function (error) {
//    console.log("Error: " + error.code);
// });


firebase.database().ref().child("Users").on("value", function (snapshot) {
  snapshot.forEach(function(childSnapshot) {
   var name=childSnapshot.val().name;
   console.log(name);
  });
});

// var loginID = document.getElementById("")
// function findAdmin(loginID, callback){

// }