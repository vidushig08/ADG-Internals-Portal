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



//Validate checkbox
function handleData1()
{
    var form_data = new FormData(document.querySelector("form"));
    if(!form_data.has("t[]"))
    {
      alert('Select a team first');
      return false;
    }
    else
    {
      //document.getElementById("chk_option_error").style.visibility = "hidden";
      console.log("hehe");
      openModal();
      return true;
    }
}

function openModal(){
  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

}








    
//Fetching Data in a table in Modal

function SelectAllData(){
  firebase.database().ref('Users').once('value',
  function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name;
        var meetuserid = CurrentRecord.val().uid;
        var teamId
        AddItemsToTable(member, meetuserid);
      }
    );
  });
}
window.onload = SelectAllData;

//Filling the table 

function AddItemsToTable(member, meetuserid){
  var table = document.getElementById('memberslist');
  var trow = document.createElement('tr');
  //Changed from Label to th
  var td1 = document.createElement('td');
  td1.innerHTML = member;
  var x = document.createElement("INPUT");
  console.log(x);
  x.setAttribute("type", "checkbox");
  x.setAttribute("class", "human");
  x.setAttribute("data-value", meetuserid);
  console.log("5");
  console.log(meetuserid);
  trow.appendChild(x);
  trow.appendChild(td1);
  table.appendChild(trow);
}

function test(){
  var meetuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetuserArr.push(val);
      }
    });
    console.log(meetuserArr);

    var meetteamArr = [];
    $("input[type='radio']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetteamArr.push(val);
      }
    });
    console.log(meetteamArr);
}


function searchTable() {
  var input, filter, table, tr, th, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("memberslist");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    th = tr[i].getElementsByTagName("td")[0];
    if (th) {
      txtValue = th.textContent || th.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


function checkAll(ele) {
  //var checkboxes = document.getElementsByTagName('input');
  var checkboxes = document.getElementsByClassName('human');
  if (ele.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].type == 'checkbox') {
              checkboxes[i].checked = true;
          }
      }
  } else {
      for (var i = 0; i < checkboxes.length; i++) {
          // console.log(i)
          if (checkboxes[i].type == 'checkbox') {
              checkboxes[i].checked = false;
          }
      }
  }
}
