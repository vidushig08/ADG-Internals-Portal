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
  firebase.analytics();



//Authentication
  document.getElementById("signupForm").addEventListener('submit', regValidation)

  //validate reg no
  function regValidation(){
    var regNoCheck = document.getElementById("signupRegno").value;
    var n = regNoArr.includes(regNoCheck);
    if(!n){
      alert("You are not a member of ADG");
      return false;
    }
    else{
      handleData();
      return true;
    }
  }

  //Validate checkbox
  function handleData()
  {
      var form_data = new FormData(document.querySelector("form"));
      if(!form_data.has("langs[]"))
      {
        alert('Select atleast one team');
        return false;
      }
      else
      {
        //document.getElementById("chk_option_error").style.visibility = "hidden";
        authSignup();
        return true;
      }
  }
  function authSignup(){
    console.log("1");
      //Taking Values from Form
      let email = document.getElementById("signupEmail").value;
      let password = document.getElementById("signupPass").value;
      //Create User with Email and Password
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      alert(errorMessage);
    });
    waitTime();
  }   

function waitTime(){
    var delayInMilliseconds = 2000;
    setTimeout(function() {
      userData();
    }, delayInMilliseconds);
}

  function userData(){
    console.log("2");
    var user = firebase.auth().currentUser;
    if (user != null){
       var userID = user.uid;
    }
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let regNo = document.getElementById("signupRegno").value;
    let phone = document.getElementById("signupContact").value;
    let fcm = "";
    var x;
    let bestFuture = Boolean(x);
    var isAdmin = Boolean(x);
    var teamArr = {};
    $("input").each(function(index, el) {
      if (el.checked) {
        var id = $(el).data("id");
        var val = $(el).data("value");
        if (!teamArr[id]) teamArr[id] = [];
        teamArr[id].push(val);
      }
    });
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(fcm);
    console.log(bestFuture);
    console.log(isAdmin);
    console.log(userID);
    console.log(teamArr);
    writeUserData(userID, name, email, regNo, phone, fcm, bestFuture, isAdmin, teamArr);
  }

function writeUserData(userID, name, email, regNo, phone, fcm, bestFuture, isAdmin, teamArr){
  console.log("3");
  firebase.database().ref('Users/' + userID).set({
    uid: userID,
    name: name,
    email: email, 
    regNo: regNo, 
    phone: phone,
    fcm: fcm,
    bestFuture: bestFuture,
    isAdmin: isAdmin, 
    teams: teamArr
  });
  signOut();
}
function signOut(){
  console.log("Logged Out");
  firebase.auth().signOut();
  alert('Signed up successfully');
}

$("#signupForm").submit(function(e) {
  e.preventDefault();
});

