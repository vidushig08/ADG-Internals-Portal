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



//Authentication
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
  var fcm= "";
  //var checkedValue = document.querySelector('.checkbx:checked').value;
  var user = firebase.auth().currentUser;
  var uid;
  if (user != null) {
   uid = user.uid;
  }
  
  var a=document.getElementById('1');
  var b=document.getElementById('2');
  var c=document.getElementById('3');
  var d=document.getElementById('4');
  var e=document.getElementById('5');
  var f=document.getElementById('6');
  var g=document.getElementById('7');
  var h=document.getElementById('8');
  var i=document.getElementById('9');

  
  //Save form
  saveForm(name,email,regNo,phone,fcm, uid);

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

//Checkbox

//var firebaseRef = firebase.database().ref('facility');
// firebaseRef.push().set({
//  timesession: checkedValue 
//   });


//Save message to firebase
function saveForm(name,email,regNo,phone,fcm, uid){
  
  
  
  console.log(uid);
  var newForm = formRef.push();
  
  newForm.set({
    name:name,
    email:email,
    regNo:regNo,
    phone:phone,
    //teams: checkedValue,
    fcm:fcm,
    uid:uid
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
