//Add Point
var id = 1;
$(function () {
  function addMore() {
    id++;
    $("#newpoint").append(
      '<label for="name" class="point">Point ' + id + ":</label>"
    );
    $("#newpoint").append('<textarea name="point1"></textarea><br><br>');
    console.log(id);
  }
  $("#plus").click(addMore);
});

const getMeetingData = async () => {
  try {
    let meetings = await fetch(
      "https://internals-app-c0391.firebaseio.com/Alerts.json"
    );
    meetings = await meetings.json();
    // console.log(meetings);
    return meetings;
  } catch (err) {
    console.log(err);
  }
};

const renderMeetings = async () => {
  const meetingSelect = document.getElementById("choosemeeting");
  let Meetings = await getMeetingData();
  console.log(Meetings);

  let Teams = Object.values(Meetings.Core).filter(
    (team) => team.type === "Meetings"
  );
  TeamsMeetings = Teams.map(
    (t) =>
      `<option value="${t.id}">
        ${t.title} ${new Date(t.time * 1000).toLocaleDateString()}
      </option>`
  );

  let Core = Object.values(Meetings.Core).filter(
    (Core) => Core.type === "Meetings"
  );
  CoreMeetings = Core.map(
    (c) =>
      `<option value="${c.id}">
        ${c.title} ${new Date(c.time * 1000).toLocaleDateString()}
      </option>`
  );
  console.log(Teams, Core);

  meetingSelect.innerHTML += TeamsMeetings + CoreMeetings;
};

renderMeetings();

// const getUsers = async () => {
//   try {
//     let users = await fetch(
//       "https://internals-app-c0391.firebaseio.com/Users.json"
//     );
//     users = await users.json();
//     console.log(users);
//     return users;
//   } catch (err) {
//     console.log(err);
//   }
// };

// // getUsers();

// const renderUsers = async () => {
//   var userList = await getUsers();
//   const teams = document.getElementsByClassName("team");
//   console.log(teams);
//   userList = Object.values(userList);
//   console.log(userList);

//   userList.forEach((user) => {
//     user.teams.forEach((team) => {
//       teams[team].innerHTML += `<div class="member-card">
//       <div class="member-name">${user.name}</div>
//       <div class="member-details">${user.regNo}</div>
//     </div>`;
//     });
//   });
// };

// renderUsers();

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
  measurementId: "G-GMC40LHFBJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function userData() {
  console.log("2");
  var user = firebase.auth().currentUser;
  if (user != null) {
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
  $("input").each(function (index, el) {
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
  writeUserData(
    userID,
    name,
    email,
    regNo,
    phone,
    fcm,
    bestFuture,
    isAdmin,
    teamArr
  );
}

function writeUserData(
  userID,
  name,
  email,
  regNo,
  phone,
  fcm,
  bestFuture,
  isAdmin,
  teamArr
) {
  console.log("3");
  firebase
    .database()
    .ref("Users/" + userID)
    .set({
      uid: userID,
      name: name,
      email: email,
      regNo: regNo,
      phone: phone,
      fcm: fcm,
      bestFuture: bestFuture,
      isAdmin: isAdmin,
      teams: teamArr,
    });
  signOut();
}
