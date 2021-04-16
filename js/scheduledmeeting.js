const getMeetings = async () => {
  try {
    let meetings = await fetch(
      "https://internals-app-c0391.firebaseio.com/Alerts.json"
    );
    meetings = await meetings.json();
    // console.log(meetings);
    return meetings;
  } catch (err) {
    console.log(err);
    alert("Failed to fetch meeting data");
  }
};

let Meetings;
const renderMeetings = async () => {
  Meetings = await getMeetings();
  const fetchedMeetings = document.querySelector(".fetchedMeetings");
  let Teams = Object.values(Meetings.Team).map((team) => {
    return { ...team, scope: "Team" };
  });

  let Core = Object.values(Meetings.Core)
    .map((core) => {
      return { ...core, scope: "Core" };
    })
    .filter((Core) => Core.type === "Meetings");

  let allMeetings = [...Teams, ...Core];
  allMeetings.sort((a, b) => b.time - a.time);
  allMeetings
    .map(
      (m) =>
        `<div class="meeting" onclick="selectMeeting('${m.id}')">
          <p class="bold">
            ${m.scope} Meeting
            <a class="post" href="">Post Attendance</a>
          </p>
          <p>${new Date(m.time * 1000).toLocaleDateString()}</p>
        </div>`
    )
    .forEach((m) => (fetchedMeetings.innerHTML += m));
  console.log(allMeetings);

  // fetchedMeetings.innerHTML += TeamsMeetings + CoreMeetings;
};

renderMeetings();
