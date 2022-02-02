import {useState} from 'react'

function Show(props) {
    //console.log(props)
    const id = props.match.params.id
    const people = props?.people
    const person = people ? people.find(p => p._id === id) : null
    /* REFRESH 2) in people = we are going to do something called option
    chaining. To do so, we insert a ? before the period. Let's look up
    option chaining.  */

    /* 27) First things first, we just want to display our person on the show page.
    This will require that we use the render props/people that we passed in.
    If we console.log props right now, we will see a data object with a lot 
    of different routes in it. We only want to grab a few things to make our
    page functional though, so let's dive in. 
    
    Let's set the id first, which is found from a special render prop element
    called 'match'. Next, we need to bring in people, simple, props.people. 
    Finally, we need to somehow decide which person we've clicked on. We 
    have that clicked person's id from our .match element, so we can use this
    to search through people to find a match. So, let's assign a variable person
    that is set to people.find, and then we pass an arrow function. This fn 
    uses our people._id and uses it to find the props.match.params.id from our
    render props. Once we have made this match, that person's data is all 
    assigned to person, and that person variable is what we will be 
    referencing throughout this page. 
    
    Let's talk about .find for a sec. This can be a precarious situation. We 
    don't want to go finding by name, since we may get back entirely unrelated
    returns. This is called a predicate function. If you want to read more, go
    for it. So, let's go return this guy vv */

    const [editForm, setEditForm] = useState(person ? person : {
        name: "",
        title: "",
        image: ""
    })
    /* 29) We need to set state. Since we want to display the info for the 
    person that we passed in through our people props and render props, we 
    are just going to set initial state to the person. We don't need to 
    useEffect since we are not awaiting an AJAX request. So, next up, let's
    go make a handleChange function, since we'll need it to change our input
    fields. vv */

    const handleChange = event => {
        setEditForm({
            ...editForm,
            [event.target.name]: event.target.value,
        })
    }
    /* 30) This is the exact same as the form in Index, so we're not gonna go
    into it. If you want to read about this, go to note number twenty three
    and give it a read over. Next up, we need to handle our submit. vv */

    const handleSubmit = event => {
        event.preventDefault()
        props.updatePeople(editForm, person._id)
        props.history.push('/')
    }
    /* 31) This looks familiar as well. Head to Index note twenty four to read
    a bit about what is going on here. HOWEVER, there is a big difference
    here, props.history.push. What is going on here? This basically acts
    like a res.redirect back to the home page. I tried putting in /people/id 
    but it would not take me to the id show page, it would only take me to 
    /people. So, this is a redirect, but it acts maybe a little strange. Anyway,
    now let's actually go set up the forms to use these two functions. vv */

    const removePerson = () => {
        props.deletePeople(person._id)
        props.history.push('/')
    }
    /* 35) We have a button that sends us here, so let's do something now. 
    Quite simply, we don't need to pass in a parameter since we are on a 
    show page with only one id available. So, let's just use that. By using
    props.deletePeople, we are accessing the function that was passed in as 
    a prop from Main.js. This is exactly like update, so we won't go into it
    here. Let's head over to Main.js to check out our delete function. */
    
    /* 32) These forms are the exact same as in Index from our create person 
    forms. However, we want to add a few differences. First, our form onSubmit 
    calls handleSubmit. The value is the big difference, it just calls our 
    editForm state. Now, let's add our input:submit and that's it. Everything
    else follows the same routes as our create, updating the state in our 
    Index.js. So, there's no reason to list everything out now. If you want to 
    read about what happens, go to Index.js note twenty two and follow the
    steps. HOWEVER, the actual update function in Main is different from the
    create function, so let's head over to Main.js and check it out << */

    /* 34) We know we want to have a way to delete our people, so let's add 
    a button. One of the beautiful things about React is that it doesn't matter
    if this is a form:submit or a button, all we're doing is calling a fn to 
    update state. So, Just add a button, add an onClick listener, and on click
    have it run the removePerson function. Let's go make that function now ^^ */
    
    /* REFRESH 1) The reason our show page is not refreshing is because 
    the props are not being rendered first. In React, the Switch route has
    to be rendered first for that reason. So, there are a few workarounds 
    here. 

    First, we can make a show route on the server side that is called 
    directly, or we can use the useEffect hook to conditionally render 
    the show page if the props are actually present. Both of these are 
    valid, but the easiest way to do it is all on the frontend. 
    
    So, let's get started by creating a loaded and loading function. In 
    the case of loaded, we render all of our normal stuff. In case we are
    not loaded, we will input an h1 saying loading ...
    
    Let's go up to cont people for options chaining ^^*/
    const loaded = () => {
        <>
        <h1>{person.name}</h1>
            <h2>{person.title}</h2>
            <img src={person.image} alt={person.name} />

            <button id="delete" onClick={removePerson}>
                DELETE
            </button>
        </>
    }

    const loading = () => <h1>Loading ...</h1>
    
    return (
        <div className="person">
            {props.people ? loaded() : loading()}  
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder='name'
                    onChange={handleChange} />

                <input 
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder='image URL'
                    onChange={handleChange} />

                <input 
                    type="text"
                    value={editForm.title}
                    name="title"
                    placeholder='title'
                    onChange={handleChange} />
                <input type="submit" value="Update Person" />
            </form>
        </div>
    )
}
/* 28) Simple enough, we are returning an h1, and h2, and an img using the
person variable. We already went over how we narrowed this down to the correct
person in twenty seven above, so if you were being lazy and didn't read it, go
up there. Next up, we want to update a person. To update someone, we have to 
change state, so let's go set that up ^^ */

export default Show