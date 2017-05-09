var config = {
    apiKey: "AIzaSyD9MoWhDZHbvaCP0V8AzBcG4fs0PK1srxw",
    authDomain: "web-quickstart-dbad8.firebaseapp.com",
    databaseURL: "https://web-quickstart-dbad8.firebaseio.com",
    projectId: "web-quickstart-dbad8",
    storageBucket: "web-quickstart-dbad8.appspot.com",
    messagingSenderId: "951023716196"
    };
firebase.initializeApp(config);

// get elements
const btnLogin = document.getElementById('login');
const btnLogout = document.getElementById('logout');
const btnGoogle = document.getElementById('google-button');
const btnCheckin = document.getElementById('check-in');
const btnCheckout = document.getElementById('check-out');
const btnProfile = document.getElementById('profile');
var user = '';
// Adding login event
btnLogin.addEventListener('click', e => {
  // get email and password
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  //sign in
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));
});


btnGoogle.addEventListener( 'click', e => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  redirect('/');
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
});

btnCheckin.addEventListener('click', e => {
    var database = firebase.database();
    var ref = database.ref('mac');
    var mac = user.uid;
    const preObject = document.getElementById('tmac');
    const dbRefObject = firebase.database().ref().child(mac);
    const dbRefItem = dbRefObject.child('macid');
    var data = {
        uid : mac,
        macid : dbRefItem,
        checkin : Date.now()
    }
    ref.push(data);
});


function authAction(){
    firebase.auth.signInWithPopup(provider).then(function(result) {
      redirect('/');
    }).catch(function(error) {
      // Handle Errors here.
      toast(error.message);
    });                    
  }



btnLogout.addEventListener('click', e => {
  // get email and password
  firebase.auth().signOut();
});

// Add Event Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    btnLogout.classList.remove('hide')
    btnLogin.classList.add('hide')
    btnGoogle.classList.add('hide')
    btnCheckin.classList.remove('hide')
    btnCheckout.classList.remove('hide')
    btnProfile.classList.remove('hide')
    user = firebaseUser
    mac = user.uid
    const preObject = document.getElementById('tmac');
    const preUid = document.getElementById('userid');
    const dbRefObject = firebase.database().ref().child(mac);
    const dbRefItem = dbRefObject.child('macid');
    dbRefItem.on('value', snap => preObject.innerText = snap.val());
  }else{
    console.log('not logged');
    btnLogout.classList.add('hide')
    btnLogin.classList.remove('hide')
    btnGoogle.classList.remove('hide')
    btnCheckin.classList.add('hide')
    btnCheckout.classList.add('hide')
    btnProfile.classList.add('hide')
  }
});
