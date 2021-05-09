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
  console.log(MOMS);

  Object.entries(MOMS)
    .map(
      ([k, m]) =>
        `<div class="MOM" onclick="selectMOM('${k}')">
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

let MOMId;
let MOM;
const selectMOM = async (mId) => {
  MOMId = mId;
  try {
    const right = document.querySelector(".right");
    1;
    const dbRef = firebase.database().ref();
    let attendance = await dbRef.child("MOMS").child(MOMId).get();
    let snapshot = await attendance.val();
    // console.log(snapshot);

    MOM = snapshot;
    right.innerHTML = "";
    right.innerHTML += `
      <h1>${MOM.header}</h1>
      <h4>${new Date(MOM.time)}</h4>
      <br />
      <h4>Points Discussed</h4>
    `;
    MOM.points.forEach((p) => {
      right.innerHTML += `<p>${p}</p>`;
    });
  } catch (error) {
    console.error(error);
  }
};

renderMOMS();
