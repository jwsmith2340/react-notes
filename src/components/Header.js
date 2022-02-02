import {login, logout} from '../services/firebase'
/* FIREBASE 11 Import our login logout fns from firebase.jsx. These are 
some of the functions that we exported after they were created. Let's head
down to our ul now vv */
import { Link } from 'react-router-dom'
/* 9) Hello, and welcome to Header.js. We are going to set up a super simple
nav bar for now. We know we are going to want it to have clickable links to 
other pages, so we start by importing Link from react-router-dom. Next, 
we're gonna head down to our return vv */

function Header(props) {
    return (
        <nav className="nav">
            <Link to="/">
                <div>People App</div>
            </Link>
            <ul>
                {
                    props.user ? 
                    <>
                    <img src={props.user.photoURL} alt={props.user.displayName} />
                    <li onClick={logout}>Logout</li>
                    </>
                    :
                    <li onClick={login}>Login</li>
            }
            </ul>
            {/* FIREBASE 12 Now we add our login and logout functions. We can 
            make these look fancy later, but for now, we just need to make
            these functional. By linking our login and logout fns, which are
            tied to Google login modals, that's all we have to do. Now, 
            let's go over to App.js to set up our user state << */}

            {/* FIREBASE 17 Now we can add a ternary in our Header, if we 
            have a user, we only see login, else, we logout. Conditional 
            rendering is super easy to do. We can also access other props 
            from our user object, like .photoURL for instance, or other 
            bits of data to make the experience better for our users. Now,
            we are going to restrict authorization. In this lesson, we set 
            up our ternary to display, within the ul, either an image AND
            an LI that displayed logout, if the user was logged in, and just 
            an LI that said login, if the user was logged out. Very simple,
            and yet very nice UX/UI. Now, let's head over to Main.jsx << */}
        </nav>
    )
    /* 10) Here, we first wrap everything in one element, as are the rules in
    React. nav seems appropriate for a nav bar. Inside of that, we only have
    one page to go to for now, so let's set up a link to / and title it People
    App. Since this header is displayed in the main App.js file, it will be 
    displayed on every page, so it'll always be available. Convenient. Now, 
    we're going to head over to our styles.scss file to check out some sass
    styling stuff. << styles.scss */
}

export default Header