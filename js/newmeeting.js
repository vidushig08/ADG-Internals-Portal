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

  console.log("hello");
  document.getElementById("post-meeting-btn").addEventListener('submit', readData)

    function readData() {
    // Get input values from each of the form elements
        var database = firebase.database();
        alert('function called');
        //var obj = {name: "sample_data"}
        //database().ref("Core/").push(obj);

        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;
        let title = document.getElementById("title").value;
        let venue = document.getElementById("venue").value;
        let link = document.getElementById("link").value;
        let type = "Duties";
        writeUserData(date,time,title,venue,link, type);
    }

    function writeUserData(date,time,title,venue,link, type){
        console.log("3");
        firebase.database().ref('Core/' + userID).set({
        id: userID,
        link: link,
        location: location, 
        time: time, 
        title: title,
        type: type
    });
    }


