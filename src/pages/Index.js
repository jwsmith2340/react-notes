import { useState } from 'react'
import { Link } from 'react-router-dom'

/* 16) First thing we need to do is set up Link. That is because we are going 
to create links to the individual show pages when we click on people. Next, 
we need to create a ternary operator to discern between the API data loading
and already being loaded. We do this so our users know that something is 
happening and don't get impatient and leave. Let's head down the page to 
just above our return() vv */

/* 20) Now, we want to create forms. To do so, we know that we are going to 
have to update state. That is because forms in React do not work like in HTML. 
We have to change and update their state every time a character is entered. 
The docs have great info on this: https://reactjs.org/docs/forms.html 
Now, let's go set up state. First, import { useState }, and then, go vv */

function Index(props) {
    // 20.5) Don't forget to accept props here
    const [ newForm, setNewForm ] = useState({
        name: '',
        image: '',
        title: '',
    })
    /* 21) Here we are setting up our form state. The state itself is called 
    newForm, the setState function is named setNewForm, and the useState is 
    declared. It isn't enough to just leave it as null though. We know that 
    we have three keys in our API objects, so we need to set them up. Remember, 
    this is a form. When we render the page, we don't want to see anything in
    the form, so our useState needs to set our name, inage, and title as 
    empty strings. If we put an 'A' in each of these, all of our forms would 
    populate with an A in them. We want them blank. Now, let's head down to 
    our return statement to create our forms. vv */

    const handleChange = (event) => {
        //console.log(event.target)
        setNewForm({ 
            ...newForm, 
            [event.target.name]: event.target.value
        })
    }
    /* 23) This is what is going to be called any time we type a character
    into an input. So, we have an event being passed in. If we console.log 
    the event.target, we see the input element being logged. So, what do we 
    actually need from this event.target to set our state? Well, we know that
    we are updating state, which is an object with three keys, name, image,
    and title. So, we need a way of targeting each of these keys deliberately
    and dynamically.
    
    So, to accomplish this, we first need to call the function setNewForm. 
    Inside of this, we need to access the state object with curlies. In that, 
    we want to first spread the current state. We use the spread operator to 
    accomplish this. We probably need to read a little more about spread syntax, 
    so... https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    Get reading. Next up, we need to target either the name, image, or title. 
    Depending on what input we're typing in, the event.target name will be one 
    of those three things. We are going to assign that name with the event 
    target value. The value is what is being entered into the input. And that
    is it. It makes perfect sense. Now, our state is being updated, and it is
    the updated state, not the characters we are actively typing, that we are
    seeing in the input fields. Great, now we have characters, but we can't 
    submit anything. Time to make our handleSubmit function. vv */

    const handleSubmit = (event) => {
        if(!props.user) return 
        event.preventDefault()
        props.createPeople(newForm)
        setNewForm({
            name: '',
            image: '',
            title: '',
        })
    }
    /* FIREBASE 22) Now that we've passed in our user as a prop, we can 
    begin to restrict functionality to non-authenticated users on the
    site. In this case, we use the same simple expression that we used
    to restrict access to the delete function. No user? No submit. Now, 
    Let's head down the page to our create people form vv */

    /* 24) Time to set up the handleSubmit function. Here, just like in the 
    handleChange function, we are passing in the event. Read more about it in 
    the previous note, or just console log it and check it out. The first thing
    we have to do in our function is call the event.preventDefault() method. 
    We use prevent default to stop the page from rerendering. Remember, one of
    the biggest strengths of React is that we don't rerender entire pages, we 
    just update state in components. This is the first bit, and it is extremely 
    important. 
    
    Next, we need to call our createPeople function. Remember that? It is the
    function we set up in Main.js. We are going to access our props to call our
    createPeople function. Let's remind ourselves of what we passed in.  
    
    props is our people 'state' from the Main.js page. That contains all of the
    data from our API request. So, we are essentially accessing the state on 
    our Main page, which is our API data. Next, the createPeople function 
    passes in our newForm. The newForm is the state in our Index.js page. This
    is our name, image, and title input fields. So, we are calling createPeople
    and passing in all of the necessary information we need to successfully build
    a new person data object. But I thought we wouldn't send props from a child
    to a parent? We're not! What we are doing is called lifting up state. This
    is what allows us to alter state in a parent component with information 
    from a child. After we call that function, we call setNewForm and pass in 
    empty strings. This resets our inputs to appear empty, something desireable
    for users. It is an expected response to a successful submission of a form
    on a webpage. Now, let's add links to our individual people show pages. vv */

    const loaded = () => {
        return props.people.map((person) => (
            <div key={person._id} className="person">
                <Link to={`/people/${person._id}`}><h1>{person.name}</h1></Link>
                {person.image && <img src={person.image} alt={person.name} />}
                <h3>{person.title}</h3>
            </div>
        ))
    }
    const loading =() => {
        return <h1>Loading...</h1>
    }
    /* 25) It is time to discuss our Link, since we already set it up in step 
    17 when we created our loaded() : loading() ternary. We have rendered a 
    link of the person's name, and that link goes to /people/person._id. This 
    is pretty basic stuff here, and it functions a lot like an a element would
    in regular html. Now that we are going to be setting up our show page, it 
    is time to head back to main to pass in props. Main.js << */

    /* BONUS CONTENT ^^ {person.image && <img src={person.image} alt={person.name} />}
    This is referred to as a 'short circuit'. This prevents ugly ima links 
    from being displayed when we do NOT have an image value uploaded in our db.
    This makes it so we do not have the little missing image icon. Instead, it
    just displays the alt value. Docs on this 'short-circuiting': 
    https://reactjs.org/docs/conditional-rendering.html This information is
    found under 'Inline If with Logical && Operator'. Essentially, what is 
    happening is the program is reading person.image. If that evaluates to true
    then it displays the image. If it is NOT true, it does not display the 
    image at all. */

    /* 17) Here ^^ we create our loaded and loading functions. They are chosen 
    with a ternary operator found inside of return that determines if props.people
    has loaded in yet or not. If not, it displays loading, seen directly above.
    If our data HAS loaded, it get a bit more complicated. 
    
    We are first going to return props.people.map. Within that map, we pass 
    in person as the param. We are then setting up a div container for our 
    return that sets the key to the person's id. Next, we set up our link. 
    It goes to /people/:id. The link is the person's name, stored in the h1. 
    Next, the image of the person is displayed below that, and their title 
    below that. That is what all is rendered on the page once the API data 
    loads. Next up, we want to create create functionality in our app, so 
    let's head back over to Main for a minute << */

    /* FIREBASE 23) We can hide the ENTIRE form if a user isn't logged in, by 
    creating a props.user &&, which is known as a short circuit, we can
    conditionally render certain things. In this case, the form will only 
    be rendered if there is a user. Basically, props.user && is only going
    to continue if props.user is truthy. If it is not, this will not be 
    rendered, but if it is, anything below it SHALL be rendered. This
    is a clean and elegant way to restrict access based on whether a 
    user is logged in. Now, go to create people function in
    Main << since that is where the createPerson function that is 
    called in handleSubmit lives << Main.jsx */
    return (
        <section>
            {
                props.user &&
                <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder='name'
                    onChange={handleChange} />

                <input 
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder='image URL'
                    onChange={handleChange} />

                <input 
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder='title'
                    onChange={handleChange} />
                <input type="submit" value="Create Person" />
            </form>
                }
            {props.people ? loaded() : loading()}
        </section>
    )
    /* 22) Let's set up our form now. In React, we have to set up our submit
    listener on the form itself. React forms are a unique animal, so this is 
    just something we learn to love. Let's keep this simple and only look at 
    one of each unique item. 
    
    First, we set up the form itself. It encapsulates everything else and has
    an 'onSubmit' listener. When we submit the form, we are going to want to 
    call a function, we'll call it handleSubmit and we'll set it up after this.
    
    Next, we need to set up our inputs. We need a type, and since all of our 
    object keys are strings, they are all strings. Next we need to setup our
    value. This is what is displayed in the form. We want to set it as our 
    state, since we will be updating and changing this as we type. So, remember, 
    our state is newForm, and we use dot notation to indicate which thing we 
    are bringing in. Next up is name. This is tied to our object key, so it 
    has to reflect the name of the object key we are wanting to update. Next 
    is the placeholder, which is optional. This is just what is displayed in 
    the form before we type in it. 

    Now, we've hit a React bit. onChange calls the function handleChange. 
    Without this event listener calling the function handleChange, we cannot
    update state. We initiated state to be empty strings, so without setting 
    state, we just have bricks for inputs. Think about this for one second...
    We have state as empty strings. We are trying to type into something
    where the state is ''. Just because I want to type in something doesn't
    mean it is going to automatically let me type in it. There. Is. State.
    So, now I have to set state to update this. 
    
    Finally, we need to set up our submit input. This one is simple, but it 
    is important. This is what our form onSubmit listener is going to react to.
    Once we submit on this input, we will call our handleSubmit. 
    
    We have to tackle both of these functions, but let's start with setting
    state. We need a function handleChange that will do this. Let's go up
    a little bit and check it out ^^ */    
}

export default Index