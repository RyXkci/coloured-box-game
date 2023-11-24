import { useState } from "react";
import "./GameForm.css";

import BoxGrid from "./BoxGrid";

export default function GameChoiceForm() {
  const [inputData, setInputData] = useState({
    numColors: 5,
    numBoxes: 6,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);


  const handleChange = (e) => {
    setInputData((currInputData) => {
      return {
        ...currInputData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true)

  }

  return (
         !isSubmitted ? 
         <>
         <h1 className="main-title">Pick your difficulty level!</h1>

    <div className="game-form-container">
      <form action="" className="game-form" onSubmit={handleSubmit}>
        <div className="game-form-input-container">
          <label htmlFor="numColors"> How many colours?</label>
          <select name="numColors" id="numColors" value={inputData.numColors} onChange={handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className="game-form-input-container">
          <label htmlFor="numBoxes"> How many boxes?</label>
          <select name="numBoxes" id="numBoxes" value={inputData.numBoxes} onChange={handleChange}>
            <option value="6">6</option>
            <option value="10">12</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <button className="game-form-button" type="submit">Go!</button>
      </form>
    </div>
    <div className="main-text-container">
      <p className="main-paragraph-title">How does this work?</p>
      <p className="main-paragraph-text">
        Well, simple, you pick the number of boxes you want and the amount of
        colours. Once you're ready, hit go, but be prepared!
      </p>
      <p className="main-paragraph-text">
        As soon as you hit go, the countdown starts! Click on the boxes and try
        and make them all the same color, then beat your own record! (Or
        challenge a friend to! Gets some shots out, start a competition!)
      </p>
      </div>
    </>
    : <BoxGrid
       numColors={inputData.numColors}
       numBoxes={inputData.numBoxes}
     />

  );
}
