import {useState} from 'react';
import './ColouredBox.css';





export default function ColouredBox({backgroundColor, changeColour}) {
    return(
        <div className="box"  style={{backgroundColor: backgroundColor}} onClick={changeColour}></div>
    )
}