import firebase from 'firebase/app'
import 'firebase/auth'
/* FIREBASE 3) First, we have to import firebase, and then we import 
firebase/auth. */

/* FIREBASE 3.5) Now, we actually need to go to console.firebase.google.com
to create our project. While doing so, we will see this firebaseConfig 
object. It is important that we copy it EXACTLY so we can use it in our 
app in this next step */
const firebaseConfig = {
    apiKey: "AIzaSyAgmT5mdHnuTrilZ3w-tarETqQTTUoQK6g",
    authDomain: "learning-firebase-b3631.firebaseapp.com",
    projectId: "learning-firebase-b3631",
    storageBucket: "learning-firebase-b3631.appspot.com",
    messagingSenderId: "600532538498",
    appId: "1:600532538498:web:8f9e03bdbe3734e442109b"
};
/* FIREBASE 4) Now, we import the firebase config object that we copied
earlier. This stuff is sensitive data, but guess what? Google dgaf, they
prevent people from breaking into your Firebase project regardless. So, 
what is cool about this is that we don't have to hide any of this info. 
Next, it is time to actually set up firebase in this app vv */

//activate firebase
firebase.initializeApp(firebaseConfig)
/* FIREBASE 5) ^^This activates the firebase app */

//configure settings
const auth = firebase.auth()
/* FIREBASE 6) This is how we configure our settings. First, we are going
to set up a variable for firebase.auth. */

//set up provider(s)
const provider = new firebase.auth.GoogleAuthProvider()
// FIREBASE 7) And now we instantiate our provider. This will always be 
//the same for us while using Google Firebase ^^

//set up auth functions
function login() {
    return auth.signInWithPopup(provider)
}
/* FIREBASE 8) This is ALL we need to do to require authentication. 
Isn't that insane? This is going to create a popup modal that will send
the user to the login function, and that's it. So easy. */

function logout() {
    return auth.signOut()
}
/* FIREBASE 9) And that is how we sign out. That's it. Isn't that crazy? */

//exports
export { login, logout, auth }
/* FIREBASE 10) We've created some stuff, but now we have to export it. So, 
we are going to export them as named exports using shorthand syntax. This
will let us use these functions in different areas. Let's head over to 
Header.js right now <<*/