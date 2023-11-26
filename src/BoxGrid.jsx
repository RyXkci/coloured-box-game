import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import ColouredBox from "./ColouredBox";
import "./BoxGrid.css";

const randomColor = () => {
  let r = Math.floor(Math.random() * 255) + 1;
  let g = Math.floor(Math.random() * 255) + 1;
  let b = Math.floor(Math.random() * 255) + 1;
  return `rgb(${r}, ${g}, ${b})`;
};

const randomIdx = (arr) => {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

const parseSeconds = (num) => {
  let minutes = Math.floor(num / 60);
  let seconds = num % 60;
  const result = {
    minutes: minutes,
    seconds: seconds,
  };
  return result;
};

export default function BoxGrid({ numColors, numBoxes }) {
  //
  // const numBoxes = 5;
  // const numColors = 2;

  const generateColors = () => {
    let colorsArr = [];
    for (let i = 0; i < numColors; i++) {
      colorsArr.push(randomColor());
    }
    return colorsArr;
  }; //Function to be run on render, generating an array of random colors the amount of numColors.
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
  }; //Function to be run on render, generating an amount of objects with a random colour
  // picked from array and saved to state. Each object is a box

  const [colorsArr, setColorsArr] = useState(generateColors);
  const [boxArr, setBoxArr] = useState(generateBoxes);

  const [endGame, setEndGame] = useState(false);

  let [time, setTime] = useState(0);
  const countRef = useRef(null);
  const [parsedTime, setParsedTime] = useState({minutes: '', seconds: ''})

  useEffect(() => {
    countRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(countRef.current);
  }, []); // Uses ref to store reference to interval to later clear it. It wouldn't clear it otherwise.

  useEffect(() => {
    const isGameOver = runValidate();
    if (!isGameOver) {
      return;
    } else {
      setEndGame((prevEndGame) => !prevEndGame);
      clearInterval(countRef.current);
      const newTime = parseSeconds(time);
      setParsedTime((prevParsedTime) => {
return {
  ...prevParsedTime,
  minutes: newTime.minutes,
  seconds: newTime.seconds
}
return {
  ...prevParsedTime,
  newTime
}
      })
    }
  }, boxArr); // useEffect function to run on every boxArr state update.
  //Uses runValidate to check if all boxes have same background color. If they are, the game is over

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
        It took you{" "}
        {parsedTime.minutes === 0
          ? `${parsedTime.seconds } seconds!`
          : `${parsedTime.minutes } minutes and ${parsedTime.seconds } seconds!`}
      </p>
    </>
  );
}
