import {useState} from 'react';
import {v4 as uuid} from 'uuid';
import ColouredBox from './ColouredBox';
import './BoxGrid.css';

const randomColor = () => {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    return `rgb(${r}, ${g}, ${b})`;
}

const randomIdx = (arr) => {
    const idx = Math.floor(Math.random() * arr.length);
         return arr[idx];
}


export default function BoxGrid(){
    // const boxes = [];
    // cost numBoxres = 10;

    const numBoxes = 6;
    const numColors = 2;
    // const colorsArr = [];

    
   
  const generateColors = () => {
    let colorsArr = []
    for (let i =0; i < numColors; i++) {
        colorsArr.push(randomColor());
       }
  return colorsArr;
}



    const generateBoxes = () => {
      let boxes = [];
        let box;
        for (let i = 0; i < numBoxes; i++) {
        box = {
            id: uuid(),
            background: randomIdx(colorsArr)
          }
          boxes.push(box);
        }
        return boxes;
        
    }




    const [colorsArr, setColorsArr] = useState(generateColors);
    const [boxArr, setBoxArr] = useState(generateBoxes);
    const [endGame, setEndGame] = useState(false);
  


    const onClick = (id) => {
        setBoxArr((prevBoxArr) => {
           return prevBoxArr.map((box) => {
            if (id === box.id) {
                return {...box, background: randomIdx(colorsArr)}
            } else {return box}
           })
        })
        if (runValidate(boxArr)) {
            setEndGame(!endGame);
        }
        // boxArr.map((box) => {
        //     if (box.id === id) {
        //         setBoxArr
        //     } else {console.log('moving on')}
        // })
    }

    const runValidate = (boxArr) => {
        return boxArr.every((box) => box.background === boxArr[0].background);
    }
   

    return (
        !endGame ? 
        <div className="box-grid">
            {boxArr.map((box) => (
                <ColouredBox
                key={box.id}
                backgroundColor={box.background}
                changeColour={() => onClick(box.id)}
                />
            ))}
        </div>
        : <h1>You Won</h1>

    )
}