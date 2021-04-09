// Your web app's Firebase configuration

//const { default: firebase } = require("firebase");

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

  document.getElementById("post-meeting-btn").addEventListener('submit', readData)

//To read values of the form
function readData() {
  // Get input values from each of the form elements    
  let date = document.getElementById("date").value;
  var unixdate = new Date(date).valueOf();
  let title = document.getElementById("title").value;
  let venue = document.getElementById("venue").value;
  let link = document.getElementById("link").value;
  let chosenTeam = getCheckedValue(document.getElementsByName('t[]'));
  console.log(chosenTeam);
  var pushmeetuserArr = [];
  // var nameuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        //var mname = $(el).data("value");
        pushmeetuserArr.push(val);
        //nameuserArr.push(mname);
      }
    });
  //let type1 = "Team ID";

  writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr);
  }

  //To push values to firebase
  function writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr)
  {
    if (chosenTeam == "z")
    {
      var meetingCore = "Meetings";
      var newMeetingKey = firebase.database().ref().child('Alerts/Core/').push().key;
      firebase.database().ref('Alerts/Core/').push({
      id: newMeetingKey,
      time: unixdate,
      title: title,
      location: venue, 
      link: link,
      type: meetingCore,
      users: pushmeetuserArr
    });
    }

    else if (chosenTeam == 0||1||2||3||4||5||6||7||8)
    {
      var newMeetingKey = firebase.database().ref().child('Alerts/Team/').push().key;
      firebase.database().ref('Alerts/Team/').push({
      id: newMeetingKey,
      time: unixdate,
      title: title,
      location: venue, 
      link: link,
      type: chosenTeam,
      users: pushmeetuserArr
    });
    }
    alert("Submitted");
  }


  //Prevent form from refreshing on submit
  $("#newMeetingForm").submit(function(e) {
    e.preventDefault();
  });


