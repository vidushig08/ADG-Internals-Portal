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
    else("error");
  }

// Check if Team is Selected 
// Check if Member is Selected
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
  if(!form_data.has("t[]"))
  {
    alert('Select a team first');
    return false;
  }
  else if(meetuserArr.length === 0)
  {
    alert("Choose Members");
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
  var unixdate = new Date(date).valueOf()/1000;
  let title = document.getElementById("title").value;
  //console.log(title);
  let venue = document.getElementById("venue").value;
  //console.log(venue);
  let link = document.getElementById("link").value;
  //console.log(link);
  let chosenTeam = getCheckedValue(document.getElementsByName('t[]'));
  //console.log(chosenTeam);
  var pushmeetuserArr = [];
  $("input[type='checkbox']").each(function(index, el) {
    if (el.checked) {
      var val = $(el).data("value");
      pushmeetuserArr.push(val);
    }
  });
  //console.log(pushmeetuserArr);

  writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr);
}

//To push values to firebase
function writeUserData(unixdate,link,venue,title,chosenTeam,pushmeetuserArr)
{
  if (chosenTeam == "z")
  {
    var meetingCore = "Meetings";
    var newMeetingKey = firebase.database().ref().child('Alerts/Core/').push().key;
    //firebase.database().ref('Alerts/Core/').child(key).push({
    firebase.database().ref('Alerts/Core/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: meetingCore,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
  });
  
    firebase.database().ref('Home/Notification/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: meetingCore,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
    });
  
  // alert("Meeting Posted");
  // window.location.reload();
  sendNotif(pushmeetuserArr);
  }

  else if (chosenTeam == "0"||"1"||"2"||"3"||"4"||"5"||"6"||"7"||"8")
  {
    var newMeetingKey = firebase.database().ref().child('Alerts/Team/').push().key;
    firebase.database().ref('Alerts/Team/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: chosenTeam,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
  });
  
  firebase.database().ref('Home/Notification/' + newMeetingKey).set({
    id: newMeetingKey,
    time: unixdate,
    title: title,
    location: venue, 
    link: link,
    type: chosenTeam,
    users: pushmeetuserArr
  }, (error) => {
    if (error) {
      alert(error);
    }
  });
  // alert("Meeting Posted");
  // window.location.reload();
  sendNotif(pushmeetuserArr);
  }
  
  else{
    alert("Please fill details");
  }
}


function sendNotif(pushmeetuserArr){
  console.log(pushmeetuserArr);
  var fcmArr = [];
  var userfcm;
  //var pushmeetuserArr = ["j8wRGcEgJrMCUAchjfTrD466iFp2", "8YUM5A4T5NaATiU2OKmrx4kQ4BS2", "NE0SB62uEubuo5BGaQy0X6Q4xkD2"];
  //console.log("2");
  for (var i =0; i < pushmeetuserArr.length; i++){
      //console.log(i);
      //console.log(pushmeetuserArr[i]);
      var ref = firebase.database().ref("Users/" + pushmeetuserArr[i]);
      ref.once("value")
      .then(function(snapshot) {
      userfcm = snapshot.child("fcm").val();
      fcmArr.push(userfcm);
  });
  }
  console.log(fcmArr);
  var titleNotif =  document.getElementById("title").value;
  let date = document.getElementById("date").value;
  var time = new Date(date);
  var timeNotif = time.toLocaleString();
  var notif = titleNotif + " on " + timeNotif;

  var myHeaders = new Headers();
            myHeaders.append("Authorization", "key=AAAAr7nfbFc:APA91bEcfhCAcXHNpLBCRwWu5MlJc9BrSZebZ_UmhlT-onKNRI2GuMGGCnN9wo2DhqZ7aj-52lxg-X1tIfvKu8hDS7gb9A8LUc7Wf8YDewqvQ-OBNvk_PWlTMvf3cFeWilYWpTD58jsr");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "registration_ids": fcmArr,
            "priority": "high",
            "content_available": true,
            "mutable_content": true,
            "notification": {
                "title": "New Meeting Scheduled",
                "body": notif,
                "sound": "default"
            },
            "sound": "default"
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => alert('error', error));
}

//Prevent form from refreshing on submit
$("#newMeetingForm").submit(function(e) {
  e.preventDefault();
});

