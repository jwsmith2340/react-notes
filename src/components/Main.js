import {useState, useEffect, useRef} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
/* FIREBASE 18) ^^ We are going to want to begin restricting access to
certain features based on authorization. As part of this, we are going to 
need to 'redirect' users if they are going somewhere they shouldn't be. 
Now that we've added redirect, let's head down to our routes vv */

/* WARNING 2) Refs can persist between renders. This is essentially going 
to shut off the weird behaviour that is occurring when the user state is
updated. So, we're going tto go down and create a reference to the getPeople
function vv */
import Index from '../pages/Index';
import Show from '../pages/Show';
/* 5) We want to set up our routes first. Now, in this app, we are going to 
display an index page and a show page. The index page is going to hold all of 
our people, the data that is being brought in on this app. When we click on 
one of our people, it is going to go to a show page. Those are the two routes, 
so we need to first import our Index and Show pages above^^*/

/* 6) Now, we want our index to show up on the path /, but we want our show
page to be on /people/:id. We have to use Switch and Route to accomplish our
routing, so let's bring those in now as well ^^, and then we'll go down the 
page into the return vv */

function Main(props) {
    {/*^^Here, we are bringing in props, and we're going to use them below.
    Where we see render={(rp)}, https://reactjs.org/docs/render-props.html
    They didn't go over it super in depth, so read about it.  */}
    
    const URL = 'https://jsmith-people-app-api.herokuapp.com/people'
    const [people, setPeople] = useState(null)
    /* 12) We have an index page set up now, and we have a nav bar that is 
    styled and appears on that index, but we have no data. We want to make 
    an API call to our backend site, so let's set up our URL variable now
    so we don't forget it later. IMPORTANT, it is important that you end 
    the URL with a final backslash. Here, it is after people. Without this, 
    your update and delete routes won't work. This is because you will be 
    inputting URL + id. Without the / explicitly set in your URL, this will
    look like URLid, which is not what we want.*/

    const getPeopleRef = useRef()
    /* WARNING 3) Now we need to create a reference, the only time to use it
    is every time the component renders. We go down to useEffect now vv*/

    /* 13) Moving right along, we need to set state. Right now, we have no
    data to display, but we can still set up our state. In the above, we see
    that our state is 'people', our set state function is named 'setPeople', 
    and our useState is passed in a value of null. We are going to be 
    bringing in the data object, so there is no reason to go nuts right now
    defining a bunch of params for the state. In fact, the only reason that 
    we have been setting up name: '', image: '', etc, is because we want the
    initial state in A FORM to contain blank fields with a eonnection back to 
    a single state object key. That's it. So, in a case like this where we 
    are bringing in an entire API object, there is no reason to do anything 
    other than set our initial state to null. Don't worry, state is going to 
    be set shortly after we make our initial useEffect API call. Next up, we
    need a function to get our data vv */

    async function getPeople() {
        const response = await fetch(URL)
        const data = await response.json()
        setPeople(data)
    }
    /* 14) Nice to see you again. It is time to set up our asynchronous fn that
    is going to retrieve our data. AKA, time to make our AJAX request. To do
    so, we have to set up an 'async function'. We then set a variable response
    to 'await' the fetch method, fetching the URL where we have our API JSON
    data stored. Once we retrieve the response, we call an await .json method
    on it, and we store that response in data. That data is the JSON data we
    want to display on our page, it is the API itself. Now, we want to set 
    state using that data. So, since this is an index page, we are setting
    state to be ALL of the items in the API. To set state with this data, it 
    is as simple as calling setPeople and passing in data. We have now called
    in our data, so now we want it to render when we initially open the page.
    This is where useEffect comes in, so let's head down there vv */

    const createPeople = async (person) => {
        if(!props.user) return //No user? Can't create crap
        const token = await props.user.getIdToken()
        //^^This is the request for the JSON Web Token. Since it is an 
        //async request, we must await the result.
        console.log(token)
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': "Application/json",
            },
            body: JSON.stringify(person)
        })
        getPeople()
    }
    /* FIREBASE 24) This is where we are going to start securing the
    backend. Request the firebase web token as const token ^^ via an async
    function that grabs this token from FB. We can log that token to see 
    what we get back when we try to create a user. The token is a secure
    JWT, which stands for JSON Web Token. So, what we are doing here is 
    grabbing this token first. We are going to use it to secure our 
    backend, because without setting up any kind of security in the 
    backend, anybody that figures out our routes can wreak havoc on our 
    website. So, once we have the token, we are going to send it to our
    backend to verify it for authenticity before any changes are 
    allowed to be made. You can console.log this token to check it out, 
    it is crazy long and super random looking. LEFT OFF AT 1:27:07 */

    /* 18) First, we need to set up our function to create new data. In this 
    case, it is people. We are calling an async function and passing in the
    parameter of person. Where is this coming from? Well, remember, the call
    to the function is coming from Index.js. It is only called when we submit
    a form that we use to create new people, so that is where we are getting
    our parameter 'person'. 
    
    Next up, we await a fetch method to the URL, and we are then calling the 
    method 'POST', assigning the headers of content-type to application/json, 
    and then defining the body as a JSON.stringify(person). After this is 
    all said and done, we are going to call the function getPeople(). That 
    is going to update our application with the newest created person. 

    ####You need more notes on this ^^ section, you don't really understand it####

    Now that we've set up the function, we need to pass it to Index as a prop, 
    along with the state, which holds all of our data. So, let's go down to 
    our return statement and pass in our props vv */    

    const updatePeople = async (person, id) => {
        if(!props.user) return //No user? No update
        await fetch(URL + id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(person),
        })
        getPeople()
    }
    /* 33) So, we just called this from Show.js, and from Show we passed in the
    editForm state as well as the id. That is how we know what we are going to
    be using to update the fields with and what piece of data is being updated.
    
    Now, exactly like the createPeople function, this is an asynchronous fn 
    and must be declared that way. Set up the function to accept the params 
    sent as arguments from Show.js. Now, we have to await a fetch request to
    URL + id. This is an update route, so it will be updating to /people/:id
    as per our backend put route. 
    
    Now, there are a few things we have to pass in to update this information.
    First, the method. Just like our HTML methods, we have to PUT, the 
    header gets set, and the body is passed as JSON stringify data. You can
    read about this in depth just above us in note eighteen.
    
    That's it as far as updating goes, so let's head back to Show.js and set
    up a delete button. Show.js << */

    async function deletePeople(id) {
        if(!props.user) return //If there's no user, we return
        await fetch(URL + id, {
            method: "DELETE",
        })
        getPeople()
    }
    /* 36) And here we are, the delete route. This is super simple. It is the 
    exact same as the update route above, except we don't need to set a header
    or body. We just fetch from the URL + id and  */

    /* FIREBASE 20) This time, we don't even need to use a ternary. Here, 
    we aren't rendering anything, we're just restricting access to the 
    delete function entirely if you aren't logged in. Now, let's head
    down the page to our return > Route > Index vv*/

    useEffect(() => {
        getPeopleRef.current = getPeople
    })
    /* WARNING 4) No dependency array this time, we want this to run after
    every render. This is where we are going to create the reference to
    the getPeople function, but we are not going to invoke it. Go look 
    up .current. Now, go down to other useEffect and replace the getPeople
    with our getPeopleRef.current and call it with (). This is the end of 
    this warning note section. */

    useEffect(() => {
        if(props.user) {
            getPeopleRef.current()
        } else {
            setPeople(null)
        }
    }, [props.user])
    /* USEEFFECT WARNING 1) At this time, we are throwing a warning:

    React Hook useEffect has a missing dependency: getPeople. 
    Either include it or remove the dependency array.

    when state is updated. This is because getPeople has to be rerendered
    locally any time state changes. To overcome this, we have to make a 
    way for our getPeople data to persist between renders. But how do we
    do this? Let's bring in useRef up top ^^ */

    /* 15) To use effect, there are only a few things to remember. To use it, 
    we make an arrow function, but we don't need to pass anything in, and then
    we call getPeople(). Now, the documentation explanation. We call useEffect
    when we want to tell the component to do something after render. React
    will remember the function we passed, referred to as the effect, and will
    call it after performing the DOM updates. Great, but why the empty array?
    This is known as a skipping effect. See, useEffect runs EVERY time the 
    page renders, and if we are constantly bringing in the API and rerendering
    once it comes in, we create an infinite loop. So, we need to put something
    in place. In this case, we don't want it to rerun at all, so we leave the
    brackets empty. But, if we wanted useEffect to run on every click, or submit
    for instance, we could put something in there that corresponds to that 
    request. React docs on this: https://reactjs.org/docs/hooks-effect.html
    Now, let's go display the data in Index.js << */

    /* 19) vv Down here, we can see in the Index component that we are passing
    in our props. We need our state data to display all of our 'people' on the 
    page, so that goes in first. Next, we need to pass in our createPeople 
    function as a prop so it is accessible to us in Index. What is neat with
    this is that we can actually use a function that does not exist in the same
    component. Now, let's head over to Index and create our forms to allow us
    to create new data. Index.js << */

    /* FIREBASE 21) vv We are going to pass in our user to index, so let's
    go to Index.jsx. << */
    return (
        <main>
            <Switch>

                <Route exact path="/">
                    <Index user={props.user} people={people} createPeople={createPeople}/>
                </Route>
                    
                <Route 
                    path="/people/:id"
                        render={rp => (
                            <Show
                            people={people}
                            updatePeople={updatePeople}
                            deletePeople={deletePeople}
                            {...rp}
                            />
                        //     props.user ? 
                        // :
                        // <Redirect to="/" />
                        )}>
                </Route>

            </Switch>       
        </main>
    )
    /* FIREBASE 19) In our show route, let's add a ternary to check for a 
    logged in user. If a user exists, they can go to the show page, but 
    if they're not, they're sent back to the home page. We can implement 
    this same function for our deletePeople fn, and really, we can 
    implement it everywhere in our app, but let's go see one more example
    in the deletePeople fn for now. ^^ 
     */

    /* 7) We can see here that we have to wrap everything in a Switch. Again, 
    since we already know we need to switch between routes, we should start by
    building this out with our Switch brackets. */

    /* 8) Next, let's set up our routes. We will be passing in parameters and
    functions later, but for now, let's just set up the Index and Show routes. 
    Pay attention to the 'exact path' notation used in the Index route. This 
    is done to prevent the index page from populating on any other pages that 
    begin with a / in the url. We'd like to add a nav bar now so we can nav 
    between the pages we're building out, so off to Header.js with you << */

    /* 26) Let's start with our Route > Show. We want to set up the path to 
    go to /people/id, but then we are going to do something interesting. We 
    are rendering <Show /> in an interesting way. What's going on here?
    
    This is what's known as a 'Render Prop', and this is what is done to 
    share code between React components using a prop whose value is a fn. 
    Huh? Basically, the prop that we want to pass in, people, is an entire 
    data set, an array containing objects. Let's remove the rp portion and 
    see what logs. 
    
    Welp, we broke our code. Nothing renders on the show page now, but in
    the console we see that we are logging an object. That object is the 
    overall data object, and inside of it are housed the 'people' objects. 
    So what is wrong with this? Well, we have to remember that we are running
    a function in Index.js to display all of our people data. It is by clicking
    on one of those names that we trigger the link to /people/_id. When this
    happens, we start our show route. It is a function that has gotten us to
    this point, and it is only one very clearly defined piece of data we are
    looking for, so we have to use render props. 
    
    So, what we are essentially doing is encapsulating the function in our 
    route. That's it. We have to use a render method with our route because
    we are processing the id dynamically created in Main. Now, we are going to
    take that information to render the Show page while passing in the props 
    passed to route via the link in Main. We are going to render Show with 
    those props passed in. That's it. It is kind of simple. So, we use an arrow
    function, passing in the render props as parameters, and we render Show.
    Now, we pass in props to Show. We are going to pass in people and the
    updatePeople and deletePeople functions. Finally, we also have to make 
    the information in the render props available, so we spread the render 
    props and pass them as a prop to Show.
    
    Now when we console log in Show, we get the render props with significantly
    more information, including .match, which contains the DB id from the person
    you clicked. This is now being passed thanks to render props, and now we
    can see how the render props make passing this data possible. Docs:
    https://reactjs.org/docs/render-props.html 

    Render props pass three unique things, history, match, and location. All
    that it does is provides some additional information for our child to use.

    Wow... That was a lot. But, anyways, on to the next thing. We've just 
    passed in some wild props to Show, so let's go make something happen over
    there. Go to Show.js << */
}

export default Main