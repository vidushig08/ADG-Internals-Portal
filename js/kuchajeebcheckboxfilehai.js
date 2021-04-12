
 class CheckboxGroup {

    /**
     * Constructor
     *
     * @param selectAllId       The HTML "id" attribute of the checkbox that controls the group
     *
     * @param groupName         The HTML "name" attribute of the checkbox group
     *
     * @param onChangeCallback  A user-defined function to execute when a checkbox in the group changes state.
     *                          The function must accept two arguments:  the first is an array of the changed
     *                          checkboxes as jQuery objects.  The second argument is a string representing
     *                          the checked state of the checkbox group:  possible values are "none", "some"
     *                          and "all".
     */
    constructor( selectAllId, groupName, onChangeCallback ) {
       const selectAllCheckbox = document.getElementById( selectAllId );
       this.name = groupName;
 
       // Set select-all checkbox listener
 
       selectAllCheckbox.addEventListener( "click", box => {
          const allCheckboxes = this.checkboxElements;
 
          const enabledCheckboxes = allCheckboxes.filter( box => !box.disabled );
          const eligibleForChecking = enabledCheckboxes.filter( box => !box.checked );
 
          const newCheckedProp = eligibleForChecking.length > 0;
          const changedBoxes = [];  // Passed to the callback
 
          let howManyChecked = 0;
 
          enabledCheckboxes.forEach( box => {
             if( box.checked !== newCheckedProp ) {
                box.checked = newCheckedProp;
                changedBoxes.push( box );
             }
          } );
 
          allCheckboxes.forEach( box => {
             if( box.checked ) {
                howManyChecked++;
             }
          } );
 
          /*
          let newState = null;
 
          if( howManyChecked === 0 ) {
             newState = CheckboxGroup.GROUP_STATE_NONE;
          } else if( howManyChecked < allCheckboxes.length ) {
             newState = CheckboxGroup.GROUP_STATE_SOME;
          } else if( howManyChecked === allCheckboxes.length ) {
             newState = CheckboxGroup.GROUP_STATE_ALL;
          } else {
             throw "Impossible result:  more checkboxes checked than actually exist";
          }
 
          updateSelectAllCheckboxState( this, newState );
 
          if( changedBoxes.length > 0 && typeof onChangeCallback === "function" ) {
             onChangeCallback( changedBoxes, newState );
          }
          */
       });
 
       
       this.checkboxElements.forEach( function(box) {
 
          box.addEventListener( "change", event => {
             let someChecked = false,
                 someNotChecked = false;
 
             let status = CheckboxGroup.GROUP_STATE_NONE;
 
             this.checkboxElements.forEach( b => {
                if( b.checked ) {
                   someChecked = true;
                } else {
                   someNotChecked = true;
                }
             } );
 
             if( someChecked && someNotChecked ) {
                status = CheckboxGroup.GROUP_STATE_SOME;
             } else if( someChecked && !someNotChecked ) {
                status = CheckboxGroup.GROUP_STATE_ALL;
             } else if( !someChecked ) {
                status = CheckboxGroup.GROUP_STATE_NONE;
             }
 
             updateSelectAllCheckboxState( this, status );
 
             if( typeof onChangeCallback === "function" ) {
                let changedBoxes = [ box ];
                onChangeCallback( changedBoxes, status );
             }
          } );
       }, this ); 
 
       setSelectAllCheckboxInitialState( this );
 
       function setSelectAllCheckboxInitialState( instance ) {
          let checkboxes = instance.checkboxElements;
          let checkedCount = 0;
          let state = null;
 
          checkboxes.forEach( function(box) {
             if( box.checked ) {
                checkedCount++;
             }
 
             if( checkedCount === 0 ) {
                state = CheckboxGroup.GROUP_STATE_NONE;
             } else if( checkedCount < checkboxes.length ) {
                state = CheckboxGroup.GROUP_STATE_SOME;
             } else if( checkedCount === checkboxes.length ) {
                state = CheckboxGroup.GROUP_STATE_ALL;
             } else {
                throw "Impossible result:  more checkboxes checked than actually exist";
             }
 
             updateSelectAllCheckboxState( this, state );
          }, instance );
       }
 
       // Sets the select-all checkbox to checked, unchecked or partially checked
       function updateSelectAllCheckboxState( instance, state ) {
          if( state === CheckboxGroup.GROUP_STATE_SOME ) {
             selectAllCheckbox.checked = false;
             selectAllCheckbox.indeterminate = true;
          } else if( state === CheckboxGroup.GROUP_STATE_ALL ) {
             selectAllCheckbox.indeterminate = false;
             selectAllCheckbox.checked = true;
          } else if( state === CheckboxGroup.GROUP_STATE_NONE ) {
             selectAllCheckbox.indeterminate = false;
             selectAllCheckbox.checked = false;
          }
          instance.state = state;
       }
    }
 
    //Returns the checkbox elements in an array
   
   get checkboxElements() {
      return Array.from( document.querySelectorAll("input[type='checkbox'][name='" + this.name + "']") );
   }
 }
 
 Object.defineProperty( CheckboxGroup, "GROUP_STATE_NONE", {
     value: "none",
     writable: false
 } );
 
 Object.defineProperty( CheckboxGroup, "GROUP_STATE_SOME", {
     value: "some",
     writable: false
 } );
 
 Object.defineProperty( CheckboxGroup, "GROUP_STATE_ALL", {
     value: "all",
     writable: false
 } );