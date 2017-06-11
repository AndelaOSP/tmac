var guardConfig = {
    apiKey: "AIzaSyD9MoWhDZHbvaCP0V8AzBcG4fs0PK1srxw",
    authDomain: "web-quickstart-dbad8.firebaseapp.com",
    databaseURL: "https://web-quickstart-dbad8.firebaseio.com",
    projectId: "web-quickstart-dbad8",
    storageBucket: "web-quickstart-dbad8.appspot.com",
    messagingSenderId: "951023716196"
    };
var guardApp = firebase.initializeApp(guardConfig, "other");


const btnLogin = document.getElementById('login');
const btnLogout = document.getElementById('logout');
const tblChecks = document.getElementById('checks');
const frmLogin = document.getElementById('loginForm');
const txtEmail = document.getElementById('inputEmail');
const txtPassword = document.getElementById('inputPassword');


btnLogin.addEventListener('click', e => {

  const auth_guard = guardApp.auth();
  // const auth = firebase.auth();
  //sign in
  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;

  const promise = guardApp.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  });
  promise.catch(e => console.log(errorMessage));
});


btnLogout.addEventListener('click', e => {
  // get email and password
  guardApp.auth().signOut();
});

// Add Event Listener
guardApp.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    tblChecks.classList.remove('hide')
    btnLogout.classList.remove('hide')
    frmLogin.classList.add('hide')
    user = firebaseUser
    mac = user.uid
    const table = document.getElementById('user');
    const dbRefObject = guardApp.database().ref().child('mac').orderByKey();
    dbRefObject.on("value", function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = childData.uid
      cell2.innerHTML = childData.macid;
      cell3.innerHTML = 
      console.log(childData.uid)
    });
});

    
  }else{
    console.log('not logged');
    btnLogout.classList.add('hide')
    btnLogin.classList.remove('hide')
    tblChecks.classList.add('hide')
  }
});