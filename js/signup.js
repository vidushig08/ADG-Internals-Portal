//Validate password
var password = document.getElementById("signupPass")
  , confirm_password = document.getElementById("signupPassConfirm");

function validatePassword(){
  if(signupPass.value != signupPassConfirm.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
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

//Listen for form submit
document.getElementById('signupForm').addEventListener('submit',submitForm);

//Submit Form
function submitForm(e){
  e.preventDefault();

  //Get values
  var name=getInputValues('signupName');
  var email=getInputValues('signupEmail');
  var regno=getInputValues('signupRegno');
  var contact=getInputValues('signupContact');
  var password=getInputValues('signupPass');
  var passwordConfirm=getInputValues('signupPassConfirm');
  var type=getInputValues('signupType');
  //var team=getInputValues('signupTeam');

  //Save form
  saveForm(name,email,regno,contact,password,passwordConfirm,type);

  //Push to Authentication
  pushtoAuth(email,password);

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

//Reference form collection
var formRef=firebase.database().ref('Users');

//Save message to firebase
function saveForm(name,email,regno,contact,password,passwordConfirm,type){
  var newForm = formRef.push();
  newFormRef.set({
    name:name,
    email:email,
    regno:regno,
    contact:contact,
    password:password,
    passwordConfirm:passwordConfirm,
    type:type,
    //teams:teams
  });

  //Save email and password to authentication

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
    // Update successful.
    }, function(error) {
    // An error happened.
   });
   
  function pushtoAuth(email,password){
    var newUser = 
  });
}
