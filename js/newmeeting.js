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

  //document.getElementById("post-meeting-btn").addEventListener('submit', readData)

    function readData() {
        // Get input values from each of the form elements
        
        let date = document.getElementById("date").value;
        var unixdate = new Date(date).valueOf();
        let title = document.getElementById("title").value;
        let venue = document.getElementById("venue").value;
        let link = document.getElementById("link").value;
        var type1 = "Duties";

        writeUserData(unixdate,link,venue,title,type1);
    }

    function writeUserData(unixdate,link,venue,title,type1){
        console.log("3");
        var newMeetingKey = firebase.database().ref().child('Alerts/Core/').push().key;
        firebase.database().ref('Alerts/Core/').push({
        id: newMeetingKey,
        date: unixdate,
        title: title,
        location: venue, 
        link: link,
        type: type1
    });
    }

    $("#newMeetingForm").submit(function(e) {
      e.preventDefault();
    });
    
