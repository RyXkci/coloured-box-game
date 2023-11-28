import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import ColouredBox from "./ColouredBox";
import "./BoxGrid.css";

//   UTILS //
import {randomColor, randomIdx, parseSeconds, timeStr} from './utils'






export default function BoxGrid({ numColors, numBoxes, setGame}) {

  const generateColors = () => {
    let colorsArr = [];
    for (let i = 0; i < numColors; i++) {
      colorsArr.push(randomColor());
    }
    return colorsArr;
  };
 //Function to be run on render, generating an array of random colors the amount of numColors.
  //saved to state so it doesn't re-run it every time.

  const generateBoxes = () => {
    let boxes = [];
    let box;
    for (let i = 0; i < numBoxes; i++) {
      box = {
        id: uuid(),
        background: randomIdx(colorsArr),
      };
      boxes.push(box);
    }
    return boxes;
  };
  //Function to be run on render, generating an amount of objects with a random colour
  // picked from array and saved to state. Each object is a box

  const [colorsArr, setColorsArr] = useState(generateColors);
  const [boxArr, setBoxArr] = useState(generateBoxes);

  const [endGame, setEndGame] = useState(false); //Boolean for conditional rendering
  const [scores, setScores] = useState(sessionStorage.getItem('allScores') || []) // Empty array in which to push score objects to save in storage. Chooses storage if present

  let [time, setTime] = useState(0); // number for interval. Holds the seconds
  const countRef = useRef(null); // Reference to clear interval
  const [parsedTime, setParsedTime] = useState({ minutes: "", seconds: "" }); // After total seconds has been turned in to object containing minutes and seconds, it's aded here for rendering.
  const [hasStarted, setHasStarted] = useState(true); //Boolean to tell app to start or stop counter

  useEffect(() => {
    countRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(countRef.current);
  }, [hasStarted]); // Uses ref to store reference to interval to later clear it. It wouldn't clear it otherwise.

  useEffect(() => {
    const isGameOver = runValidate();
    if (!isGameOver) {
      return;
    } else {
      gameOver()
    }
  }, boxArr); // useEffect function to run on every boxArr state update.
  //Uses runValidate to check if all boxes have same background color. If they are, the game is over

  const gameOver = () => {
    setEndGame((prevEndGame) => !prevEndGame);
    clearInterval(countRef.current);
    const newTime = parseSeconds(time);
    setParsedTime((prevParsedTime) => {
      const newParsedTime = {
        ...prevParsedTime,
        minutes: newTime.minutes,
        seconds: newTime.seconds,
      }; //Saves the parsed time to state, saved to variable to run updated state to sessionSet function
      sessionSet(newParsedTime)
      return newParsedTime;
    });
   
  }

  const sessionSet = (nums) => {
    setScores((prevScores) => {
      const newScores = 
      [...prevScores,
         nums
        ]
         sessionStorage.setItem('allScores', JSON.stringify(newScores))
         return newScores
      }) // updates Scores state and sets session storage.
    }

  const runValidate = () => {
    return boxArr.every((box) => box.background === boxArr[0].background);
  };

  const onClick = (id) => {
    setBoxArr((prevBoxArr) => {
      let newColor = randomIdx(colorsArr);

      return prevBoxArr.map((box) => {
        // ensures box always changes to new color and it doesn't pick the previous color
        if (id === box.id) {
          if (newColor === box.background) newColor = randomIdx(colorsArr);
          return { ...box, background: newColor };
        } else {
          return box;
        }
      });
    });
  };

// BUTTONS AND RESET LOGIC //

  const tryAgain = () => {
    setEndGame((prevEndGame) => !prevEndGame);
    setBoxArr(generateBoxes());
    setTime(0);
    setHasStarted((prevHasStarted) => !prevHasStarted)  }

    const reset = () => {
      setGame()      
      sessionStorage.clear();

    }

    // RENDER

  return !endGame ? (
    <div className="box-grid">
      {boxArr.map((box) => (
        <ColouredBox
          key={box.id}
          backgroundColor={box.background}
          changeColour={() => onClick(box.id)}
        />
      ))}
    </div>
  ) : (
    <>
      <h1>You Finished!</h1>
      <p>
        {timeStr(parsedTime)}
      </p>
      <div className="btn-container">
        <button onClick={tryAgain} className="btn btn-filled">Try again!</button>
        <button onClick ={reset} className="btn btn-ghost">Reset!</button>
      </div>
      {scores.length > 1 && 
      <div className="score-container">
      <p className="scores-container-text">Previous Scores:</p>
        <ul>
          {scores.map((score) => <li key={uuid()}>{score.minutes} minutes and {score.seconds} seconds</li>)}
        </ul>
      </div>}
    </>
  );
}
