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
  const email = document.getElementById('inputEmail').value;
  const password = document.getElementById('inputPassword').value;
  const promise = guardApp.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  });
  promise.catch(e => console.log(errorMessage));
});


btnLogout.addEventListener('click', e => {
  guardApp.auth().signOut();
});


guardApp.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    tblChecks.classList.remove('hide')
    btnLogout.classList.remove('hide')
    frmLogin.classList.add('hide')
    
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
      var cell5 = row.insertCell(4);
      
      cell1.innerHTML = childData.uid;
      cell2.innerHTML = childData.macid;
      cell3.innerHTML = childData.action;
      const actual_time = childData.time;
      cell4.innerHTML = actual_time;
      let btn_accept = "<button id='btn-success' type='button' class='col-md-12 btn btn-success' style='margin-bottom:10px'>Accept</button>"
      let btn_reject = "<button id='btn-reject' type='button' class='col-md-12 btn btn-danger'>Reject</button"
      let newcontent = "<div class='col-md-12'>" + btn_accept + btn_reject + "</div>";
      cell5.innerHTML = newcontent;
      const btnSuccess = document.getElementById('btn-success');
      const btnReject = document.getElementById('btn-reject');

      btnSuccess.addEventListener('click', e => {
        console.log("Success was clicked")
      });

      btnReject.addEventListener('click', e => {
         console.log("Reject was clicked")
      });
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