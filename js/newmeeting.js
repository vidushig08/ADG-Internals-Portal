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

  document.getElementById("newMeetingForm").addEventListener('submit', TDate)

  //Date Checker to be Greater than Today's
 function TDate() {
    var UserDate = document.getElementById("date").value;
    var ToDate = new Date();
      
    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
        alert("Choose a Future Date");
        //return false;
    }
    else if (new Date(UserDate).getTime() >= ToDate.getTime()){
      handleData2();
    }
    else("Vidu");
    }

    function handleData2()
  {
    var form_data = new FormData(document.querySelector("form"));
    var meetuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
    if (el.checked) {
      var val = $(el).data("value");
      meetuserArr.push(val);
      return meetuserArr;
    }
  });
    //var user_data = document.getElementById('selectedMembers').innerHTML === "";
    //var meetuserArr.length = 
    if(!form_data.has("t[]"))
    {
      alert('Select a team first');
      return false;
    }
    else if(meetuserArr.length === 0)
    {
      //document.getElementById("chk_option_error").style.visibility = "hidden";
      alert("Choose");
    }
    else{
      readData();
      return true;
    }
}
    
//Get radio button value
  function getCheckedValue(el) {
    for (var i = 0, length = el.length; i < length; i++) {
      if (el[i].checked) {
        return el[i].value;
        break;
      }
    }
    return '';
  }


//To read values of the form
function readData() {
  // Get input values from each of the form elements    
  let date = document.getElementById("date").value;
  var unixdate = new Date(date).valueOf();
  let title = document.getElementById("title").value;
  console.log(title);
  let venue = document.getElementById("venue").value;
  console.log(venue);
  let link = document.getElementById("link").value;
  console.log(link);
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
    console.log(pushmeetuserArr);
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
    alert("Meeting Posted");
    }

    else if (chosenTeam == "0"||1||2||3||4||5||6||7||8)
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
    alert("Meeting Posted");
    }
    
    else{
      alert("Fill");
    }
  }


  //Prevent form from refreshing on submit
  $("#newMeetingForm").submit(function(e) {
    e.preventDefault();
  });
