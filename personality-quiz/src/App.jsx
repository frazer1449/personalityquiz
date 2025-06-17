import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';
import { UserContext } from './components/UserContext';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [userName, setUserName] = useState("")
  const [element, setElement] = useState("")
  const [artwork, setArtwork] = useState(null)

  const questions = [
    {
      question: "What kind of weather do you prefer?",
      options: ["Sunny ☀️", "Rainy 🌧️", "Windy 🌬️", "Snowy ❄️"]
    },
    {
      question: "Which pet would you choose?",
      options: ["Dragon 🐉", "Dolphin 🐬", "Turtle 🐢", "Eagle 🦅"]
    },
    {
      question: "Pick a hobby:",
      options: ["Camping 🏕️", "Surfing 🏄‍♂️", "Gardening 🌱", "Skydiving 🪂"]
    },
    {
      question: "What motivates you?",
      options: ["Passion 🔥", "Calm 🌊", "Growth 🌿", "Freedom 🌬️"]
    }
  ]

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    // Question 1: Weather
    "Sunny ☀️": "Fire",
    "Rainy 🌧️": "Water",
    "Snowy ❄️": "Earth",
    "Windy 🌬️": "Air",
  
    // Question 2: Pet
    "Dragon 🐉": "Fire",
    "Dolphin 🐬": "Water",
    "Turtle 🐢": "Earth",
    "Eagle 🦅": "Air",
  
    // Question 3: Hobby
    "Camping 🏕️": "Fire",
    "Surfing 🏄‍♂️": "Water",
    "Gardening 🌱": "Earth",
    "Skydiving 🪂": "Air",
  
    // Question 4: Motivation
    "Passion 🔥": "Fire",
    "Calm 🌊": "Water",
    "Growth 🌿": "Earth",
    "Freedom 🌬️": "Air"
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  
  function handleUserFormSubmit(name) {
    setUserName(name);
  };
  
  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };
  // artwork has props title, primaryImage, artistDisplayName, objectDate
  async function fetchArtwork(keyword){
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}`);
    const fireList = await response.json()
    if (!fireList.objectIDs || fireList.objectIDs.length === 0) {
      console.log("No artwork found");
      return;
    }

    const imageId = fireList.objectIDs[0]

    const artworkResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${imageId}`)
    const artworkData = await artworkResponse.json()

    setArtwork(artworkData)
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              <Results element={element} artwork={artwork} />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
