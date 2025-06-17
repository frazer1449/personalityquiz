import React from "react";

export default function Question({question, options, onAnswer}){
    return (
        <div>
            <h2>{question}</h2>
            {options.map((option) => 
                <button
                    key={option}
                    onClick={function () {
                        onAnswer(option);
                    }}>
                    {option}
                </button>
            )}
        </div>
    )
}