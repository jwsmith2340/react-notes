import {useState, useEffect} from 'react'
import {auth} from './services/firebase'
/* FIREBASE 13)^^ Now we need to import useState, useEffect, and auth so 
we can use them to configure our App.jsx authentication routes. Let's go
down and set up state vv */
import Header from './components/Header'
import Main from './components/Main'

/* 1) Since we know that we are going to use routes in this app, the FIRST 
THING we have to do is download npm i react-router-dom@5 in the terminal, then
go to our index.js file to bring in our browser router. <<index.js */

/* 3) Of course, everything BEGINS in app.js, but it doesn't have to hold the 
entire application. In this case, we are going to be doing the majority of the
work in our Main page. We know we want a file structure of two page components
and two component components (widgets, like counters, etc), so set up the file
structure and then go complete a standard boilerplate. vv*/

/* 4) Now that we have set up our pages, import Header and Main ^^ and display
them in our App() return vv. Now that we've done that, our Header and Main
are going to show up in our main app. The main landing page for this app, and 
kind of the brain of the entire thing, is going to be Main.js, so let's head
over there and get to work <<Main.js */

/* FIREBASE 1) Open your terminal, we have to install the firebase package
from npm. READ THIS ENTIRE THING. Version 9 is a new syntax entirely, so,
Daniel is going to teach us how to use Version 8, but we can always learn 
v9 on our own later. So, for this case, in the terminal: npm i firebase@8 */

/* FIREBASE 2) Now, we want to create a folder within source called services
and within that, we make a file called firebase.jsx. Go there now <<*/

import './App.css';

function App() {

  const [user, setUser] = useState(null)
  /* FIREBASE 14) We set our state. Initially, until a user signs in, 
  the user state is null. That makes perfect sense. Now, let's go set 
  up our useEffect vv */
  
  useEffect(()=> {
    auth.onAuthStateChanged(user => setUser(user))
  }, [])
  /* FB 15) Now, set up our useEffect with an empty effect array, since 
  we only want this to be run one time. We are going to set up a subscription.
  So what is that? We are going to set up listeners. auth.onAuthStateChanged
  listens for a change in authentication state. When this gets
  called it will give us one of two values, either null or a user object. 
  Regardless of whether we login or logout, we are just going to setUser
  as user. This is because it will either be null if there is no user, or 
  it will be the user object, that's it. Now, while it may seem like we 
  won't get much mileage out of setting an anonymous user, we will soon 
  see how we can access that user's unique id to tie them to certain routes
  or created elements in our app. For now, let's pass in our user as props
  so it may be used in other areas of our app vv */

  /* FB 16) vv Now, pass down the user as a prop to both Header and Main.
  If we go to our dev tools > components > App > State, we can see our
  user object data. Go check that out for a minute. You're going to see 
  under hooks (where our user state is stored) a lot of good, useful data.
  Of particular note is the uid, the user's unique id string. This is 
  going to be passed in with the rest of the user data as props to both
  Header and Main in this case. Now, let's go over to Header.jsx to 
  see how to use this user prop to effect some conditional rendering << */
  return (
    <div className="App">
      <Header user={user}/>
      <Main user={user}/>
    </div>
  );
}

export default App;
