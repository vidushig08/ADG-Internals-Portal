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

firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Reference for form collection
let formMessage = firebase.database().ref('register');

//listen for submit event
document.getElementById('signupForm').addEventListener('submit', formSubmit);

//Submit form
function formSubmit(e) 
{
    e.preventDefault();
    // Get Values from the DOM
    let name = document.querySelector('#signupName').value;
    let email = document.querySelector('#signupEmail').value;
    let regno = document.querySelector('#signupRegno').value;
    let contact = document.querySelector('#signupContact').value;
    let password1 = document.querySelector('#signupPass').value;
    let passwordConfirm = document.querySelector('#signupPassConfirm').value;
    let type = document.querySelector('#signupType').value;

    //send message values
    sendMessage(name, email, regno, contact, password1, passwordConfirm, type);

    //Show Alert Message
    document.querySelector('.alert').style.display = 'block';

    //Hide Alert Message After Seven Seconds
    setTimeout(function() 
    {
        document.querySelector('.alert').style.display = 'none';
    }, 7000);

    //Form Reset After Submission
    document.getElementById('signupform').reset();
}

//Send Message to Firebase
function sendMessage(name, email, regno, contact, password1, passwordConfirm, type) {
    let newFormMessage = formMessage.push();
    newFormMessage.set({
      name: name,
      email: email,
      regno:regno,
      password1: password1,
      passwordConfirm: passwordConfirm
      type: type
    });
}
