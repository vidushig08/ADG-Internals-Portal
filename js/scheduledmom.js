const getMOMS = async () => {
  try {
    let moms = await fetch(
      "https://internals-app-c0391.firebaseio.com/MOMS.json"
    );
    moms = await moms.json();
    // console.log(moms);
    return moms;
  } catch (error) {
    console.error(error);
    alert("Failed to fetch mom data");
  }
};

let MOMS;

const renderMOMS = async () => {
  MOMS = await getMOMS();
  const fetchedMOMS = document.querySelector(".fetchedMOMS");
  // console.log(fetchedMOMS);

  Object.entries(MOMS)
    .map(
      ([k, m]) =>
        `<div class="MOM" onclick="selectMOM('${m.id}')">
          <div style="display: flex; justify-content: space-between;">
          <p class="bold">
            ${m.header}
          </p>
          </div>
          <p>${new Date(m.time * 1000).toLocaleDateString()}</p>
        </div>
          `
    )
    .forEach((m) => (fetchedMOMS.innerHTML += m));
};

const selectMeeting = async (mId) => {
  meetingId = mId;
  try {
    const ackMarkup = document.querySelector(".available");
    const nonAckMarkup = document.querySelector(".unavailable");
    const dbRef = firebase.database().ref();
    let attendance = await dbRef
      .child("AlertAttendance")
      .child(meetingId)
      .get();
    let snapshot = await attendance.val();

    Users = await Promise.all(
      Object.entries(snapshot).map(async ([key, value]) => {
        let user = await dbRef.child("Users").child(key).get();
        let snap = await user.val();
        return { ...snap };
      })
    );

    acknowledged = Users.filter((u) => snapshot[u.uid] === "available");

    ackMarkup.innerHTML = `<h3>Acknowledged</h3>`;
    if (acknowledged) {
      acknowledged.forEach((user, i) => {
        ackMarkup.innerHTML += `<div class="user">
          <h4>${user.name}</h4>
          <p>${user.regNo}</p>
          <div id="${i}"onclick="changeStatus(this.id, 0)">Change Status</div>
        </div>`;
      });
    } else {
      nonAckMarkup.innerHTML = `<p>No members</p>`;
    }
    unavailable = Users.filter((u) => snapshot[u.uid] !== "available");
    nonAckMarkup.innerHTML = `<h3>Unavailable</h3>`;
    if (unavailable) {
      unavailable.forEach((user, i) => {
        nonAckMarkup.innerHTML += `<div class="user">
          <h4>${user.name}</h4>
          <p>${user.regNo}</p>
          <div id="${i}"onclick="changeStatus(this.id, 1)">Change Status</div>
        </div>`;
      });
    } else {
      nonAckMarkup.innerHTML = `<p>No members</p>`;
    }
  } catch (error) {
    console.error(error);
  }
};

renderMOMS();
