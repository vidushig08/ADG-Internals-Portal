function onChange( checkboxes, checkedState ) {
   //var html = "<p>Changed:<br/>";
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

   //  To display state - nahi chahiye yeh hume
   //  document.getElementById( "getState1" ).addEventListener( "click", () => {
   //     alert( group1.name + " state is '" + group1.state + "'" );
   //  } );
});