//Validate password
var password = document.getElementById("signupPass"),
confirm_password = document.getElementById("signupPassConfirm");

function validatePassword(){
  if(signupPass.value != signupPassConfirm.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } 
  else {
    confirm_password.setCustomValidity('');
  }
}
signupPass.onchange = validatePassword;
signupPassConfirm.onkeyup = validatePassword;

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

//Reference form collection
var formRef=firebase.database().ref("Users");

//Listen for form submit
document.getElementById('signupForm').addEventListener('submit',submitForm);

//Submit Form
function submitForm(e){
  e.preventDefault();

  //Get values
  var name=getInputValues('signupName');
  var email=getInputValues('signupEmail');
  var regNo=getInputValues('signupRegno');
  var phone=getInputValues('signupContact');
  var password=getInputValues('signupPass');
  var passwordConfirm=getInputValues('signupPassConfirm');
  var type=getInputValues('signupType');
  //var team=getInputValues('signupTeam');

  //Save form
  saveForm(name,email,regNo,phone);

  //Show alert
  document.querySelector('.alert').style.display = 'block';

  //Hide Alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  //Clear Form
  document.getElementById('signupForm').reset();
}

//Function to get form values
function getInputValues(id){
  return document.getElementById(id).value;
}

//Save message to firebase
function saveForm(name,email,regNo,phone){
  var newForm = formRef.push();
  newForm.set({
    name:name,
    email:email,
    regNo:regNo,
    phone:phone
});
}

function authSignup(){

 var email1=document.getElementById('signupEmail').value;
 var password1=document.getElementById('signupPass').value;
 
 //Create User with Email and Password
 firebase.auth().createUserWithEmailAndPassword(email1, password1).catch(function(error) {

   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   console.log(errorCode);
   console.log(errorMessage);
 });

}
/*
  function signupwithEmailandPassword() {
    var email=getInputValues('signupEmail');
    var password=getInputValues('signupPass');
    console.log("hello");

  //Save email and password to authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
  })

  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  }); 
}
*/
