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

//Authentication - Firebase - Login 
const auth = firebase.auth();

document.getElementById("signinForm").addEventListener('submit', login);

function login(){
  console.log("1");
    var ref = firebase.database().ref().child("Users");
    var loginID = document.getElementById("loginID").value;
    var loginPass = document.getElementById("loginPass").value;
    ref.orderByChild("email").equalTo(loginID).on("child_added", function(snapshot) {
      console.log(snapshot.key);
      console.log(snapshot.val().isAdmin);
      var admin = snapshot.val().isAdmin;
      if (admin == true){
          console.log("2");
          firebase.auth().signInWithEmailAndPassword(loginID, loginPass)
          .then((userCredential) => {
            // Signed in
            //var user = userCredential.user;
            alert("Signed in Successfully");
            console.log("redirect");
            window.location.assign("newmeet.html");
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
          });

      }
      else if (admin == false){
        console.log("3");
        alert("You are not an Admin !");
      }
    });
}

/*
auth.onAuthStateChanged(function(user){
    if(user){
        window.location = "newmeet.html";
    }else{   
        //alert("User not found");
        //no user is signed in
    }
});
*/
    
function logout(){
  firebase.auth().signOut();
  console.log("signed out");
  window.location.replace("index.html");
}


$("#signinForm").submit(function(e) {
  e.preventDefault();
});
