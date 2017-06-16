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
const txtTMACID = document.getElementById('tmacid');
const btnUpdate = document.getElementById('update');
const btnCancel = document.getElementById('cancel');
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
    var userid = user.uid;
    const macid = document.getElementById('tmac').innerHTML;
    const now = Date()

    var data = {
        uid : userid,
        macid : macid,
        action : 'checkin',
        time : now
    }
    ref.push(data);
    console.log(mac);
    btnCheckin.classList.remove('btn-warning')
    btnCheckin.classList.add('btn-success')
    btnCheckout.classList.remove('btn-success')
    btnCheckout.classList.add('btn-warning')
});

btnCheckout.addEventListener('click', e => {
    var database = firebase.database();
    var ref = database.ref('mac');
    var userid = user.uid;
    const macid = document.getElementById('tmac').innerHTML;
    var data = {
        uid : userid,
        macid : macid,
        action : "checkout",
        time : now
    }
    ref.push(data);
    console.log(mac);
    btnCheckin.classList.remove('btn-success')
    btnCheckin.classList.add('btn-warning')
    btnCheckout.classList.remove('btn-warning')
    btnCheckout.classList.add('btn-success')
});

btnProfile.addEventListener('click', e => {
    btnCancel.classList.remove('hide')
    btnUpdate.classList.remove('hide')
    txtTMACID.classList.remove('hide')
});

btnUpdate.addEventListener('click', e => {

    var database = firebase.database();
    var ref = database.ref('users');
    var userid = user.uid;
    const macid = document.getElementById('tmacid').value;   

    ref.child(userid).set({MACID: macid,});
    btnCancel.classList.add('hide')
    btnUpdate.classList.add('hide')
    txtTMACID.classList.add('hide')
});

btnCancel.addEventListener('click', e => {
    btnCancel.classList.add('hide')
    btnUpdate.classList.add('hide')
    txtTMACID.classList.add('hide')
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
    btnCancel.classList.add('hide')
    btnUpdate.classList.add('hide')
    txtTMACID.classList.add('hide')
    user = firebaseUser
    mac = user.uid
    const preObject = document.getElementById('tmac');
    const dbRefObject = firebase.database().ref().child('users');
    const dbRefItem = dbRefObject.child(mac).child('MACID');
    dbRefItem.on('value', snap => preObject.innerText = snap.val());
  }else{
    console.log('not logged');
    btnLogout.classList.add('hide')
    btnLogin.classList.remove('hide')
    btnGoogle.classList.remove('hide')
    btnCheckin.classList.add('hide')
    btnCheckout.classList.add('hide')
    btnProfile.classList.add('hide')
    btnCancel.classList.add('hide')
    btnUpdate.classList.add('hide')
    txtTMACID.classList.add('hide')
  }
});