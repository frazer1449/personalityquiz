import {useState, useContext} from "react";
import {UserContext} from "./UserContext.jsx"

export default function UserForm(){
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);

    function handleSubmit(e){
        e.preventDefault();
        setName(inputName);  // Set the name in context
        window.history.pushState({}, '', '/quiz');  // Change the URL without reloading the page
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);  // Dispatch a navigation event
    }

    return (<form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input 
            id="name"
            type="name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
        ></input>
        <button type="submit">Start Quiz</button>
    </form>)
}