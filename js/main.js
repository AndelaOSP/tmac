

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCwc3FrroNr3-MdKdOyAYjzuUjkCONdGe8",
  authDomain: "tmac-6e73c.firebaseapp.com",
  databaseURL: "https://tmac-6e73c.firebaseio.com",
  projectId: "tmac-6e73c",
  storageBucket: "tmac-6e73c.appspot.com",
  messagingSenderId: "751681231501"
};
firebase.initializeApp(config);


/*
 * Guard section
 */

 $("#date-today").text(moment().format('MMMM Do, YYYY'));
