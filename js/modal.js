//Validate radio button
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
  
//Open Modal
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

    /*var tableDel = document.getElementById('memberslist');
    //var trowDel = document.getElementById("membertable1");
    //trowDel.remove();   
    for (var i = 1, row; row = tableDel.rows[i]; i++) {
      row.remove();
      console.log(i);
    } */ 
  }
    
    // //When the user clicks on add close the modal
    // button.add.onclick = function() {
    // modal.style.display = "none";
    // }

    // var addBtn = document.getElementById("add");
    // addBtn.onclick = function() {
    //   modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  sortTeam();
  }

//Fetch Data according to team (Core/Team ID)
function sortTeam(){
  var chosenCore = getCheckedValue(document.getElementsByName('t[]'));
  if (chosenCore=="z"){
    selectAllDataCore();
  }
  else if (chosenCore == 0||1||2||3||4||5||6||7||8) {
    selectAllData();
  }
}

//Fetching ALL Member Names in the Modal
function selectAllDataCore(){
  firebase.database().ref('Users').once('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name;
        var meetuserid = CurrentRecord.val().uid;
        var memberArr = [];
        var meetuseridArr = [];
        memberArr.push(member);
        meetuseridArr.push(meetuserid);
        AddItemsToTable(member, meetuserid);
      }
    );
  });
}

//Fetching Data in a table in Modal
function selectAllData(){
  var chosenTeam = getCheckedValue(document.getElementsByName('t[]'));
  console.log(chosenTeam);
  firebase.database().ref('Users').once('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var member = CurrentRecord.val().name;
        var meetuserid = CurrentRecord.val().uid;
        var teamId = CurrentRecord.val().teams;
        console.log(teamId);
        var n = teamId.includes(parseInt(chosenTeam));
        if (n==true){
          console.log("hi");
          AddItemsToTable(member, meetuserid);
        }
        else{
          console.log("bye");
        }
      }
    );
  });
}

//Filling the table in the Modal
function AddItemsToTable(member, meetuserid){
  var table = document.getElementById('memberslist');
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  td1.innerHTML = "<input type='checkbox' id='human' class='human' name='item[]' data-value='" + meetuserid + "' value='" + member +"'>" + " " + member;
  trow.appendChild(td1);
  table.appendChild(trow);
}

//Search bar in Modal
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

//To display names of chosen members
function test(){
  var meetuserArr = [];
    $("input[type='checkbox']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetuserArr.push(val);
        return meetuserArr;
      }
    });
  console.log(meetuserArr);

  var nameuserArr = $("input[name='item[]']:checked").map(function () {
    return this.value;
  }).get();
  console.log(nameuserArr);

  nameuserArr.forEach(el => {
    document.getElementById('selectedMembers').innerHTML +=`<button class="pill" type="button">${el}</button>`;
    // here result is in the id of the div present in the dom
  });

  var meetteamArr = [];
    $("input[type='radio']").each(function(index, el) {
      if (el.checked) {
        var val = $(el).data("value");
        meetteamArr.push(val);
      }
    });
    console.log(meetteamArr);
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    var content = document.getElementById("fetchmemberslist");
  
    console.log("Heyya");    
  };

//Check All in Modal
$(function() {
  $(document).on('click', '#checkAll', function() {
    if ($(this).val() == 'Check All') {
      $('.fetchmemberslist input[type="checkbox"]').prop('checked', true);
      $(this).val('Uncheck All');
    } 
    else {
      $('.fetchmemberslist input[type="checkbox"]').prop('checked', false);
      $(this).val('Check All');
    }
  });
});