firebase.auth().onAuthStateChanged(function(user){
  if(user){
      alert("Hi");
  }else{
      window.location.href = "index.html";   
      alert("User not found");
      //no user is signed in
      break;
  }
});


function logout(){
    //window.location.replace("index.html");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Signed Out");

      }).catch((error) => {
        // An error happened.
        alert(error);
      });
  }