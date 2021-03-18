const memberList = document.getElementById("member-list");

const getUsers = async () => {
  try {
    let users = await fetch(
      "https://internals-app-c0391.firebaseio.com/Users.json"
    );
    users = await users.json();
    // console.log(users);
    return users;
  } catch (err) {
    console.log(err);
  }
};

const renderUsers = async () => {
  var userList = await getUsers();
  userList = Object.values(userList);
  console.log(userList);

  for (let i = 0; i < userList.length; ++i) {
    memberList.innerHTML += `${userList[i].name} <br />`;
  }
};

renderUsers();
