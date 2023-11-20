import {useState} from 'react';
import './ColouredBox.css';

const randomChoice = (arr) => {
     const idx = Math.floor(Math.random() * arr.length);
          return arr[idx];
 }




export default function ColouredBox({colorsArr}) {
   const [backgroundColor, setBackgroundColor] = useState(randomChoice(colorsArr));

   const changeColor = () => {
setBackgroundColor(randomChoice(colorsArr));
   }
    return(
        <div className="box" onClick={changeColor} style={{backgroundColor: backgroundColor}}></div>
    )
}