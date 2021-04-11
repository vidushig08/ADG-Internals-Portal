function onChange( checkboxes, checkedState ) {
    var html = "<p>Changed:<br/>";

    for( var i = 0; i < checkboxes.length; i++ ) {
       var box = checkboxes[i];
       var line = box.id + " : " + ( box.checked ? "checked" : "unchecked" ) + "<br/>";

       //html += line;
    }

    //html += ("</p><p>Checked state of group is: " + checkedState + "</p>");

    //document.getElementById( "log" ).innerHTML = html;
 }

 window.addEventListener( "DOMContentLoaded", () => {
    const group1 = new CheckboxGroup(
       "selectAllGroup1",
       "group1",
       onChange
    );

    const group2 = new CheckboxGroup(
       "selectAllGroup2",
       "group2",
       onChange
    );

    document.getElementById( "btnChangeByScript" ).addEventListener( "click", () => {
       var box = document.getElementById( "group2_a" );

       box.checked = !box.checked;
       box.dispatchEvent( new Event("change") );
    } );

    const group3 = new CheckboxGroup(
       "selectAllGroup3",
       "group3",
       onChange
    );

    document.getElementById( "getState1" ).addEventListener( "click", () => {
       alert( group1.name + " state is '" + group1.state + "'" );
    } );

    document.getElementById( "getState2" ).addEventListener( "click", () => {
       alert( group2.name + " state is '" + group2.state + "'" );
    } );

    document.getElementById( "getState3" ).addEventListener( "click", () => {
       alert( group3.name + " state is '" + group3.state + "'" );
    } );
 } );