//Add Point
var id = 1;
        $(function() {
        function addMore() {
            id++;
            $('#newpoint').append('<label for="name" class="point">Point ' +id+ ':</label>');
            $('#newpoint').append('<textarea name="point1"></textarea><br><br>');
            console.log(id);
        }           
        $("#plus").click(addMore);
        })

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

  function userData(){
    console.log("2");
    var user = firebase.auth().currentUser;
    if (user != null){
       var userID = user.uid;
    }
    let header = document.getElementById("header").value;
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