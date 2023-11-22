import {useState} from 'react';
import './ColouredBox.css';

// const randomChoice = (arr) => {
//      const idx = Math.floor(Math.random() * arr.length);
//           return arr[idx];
//  }




export default function ColouredBox({backgroundColor, changeColour}) {
//    const [backgroundColor, setBackgroundColor] = useState(randomChoice(colorsArr));

//    const changeColor = () => {
// setBackgroundColor(randomChoice(colorsArr));
//    }

    return(
        <div className="box"  style={{backgroundColor: backgroundColor}} onClick={changeColour}></div>
    )
}