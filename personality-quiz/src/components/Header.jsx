import React from "react"; 
import { Link } from "react-router-dom";

export default function Header(){
    return (<div className="header">
        <h1>Which Element Are You?</h1>
        <p>(based on completely random things)</p>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/quiz">Start Quiz</Link>
        </nav>
    </div>)
}