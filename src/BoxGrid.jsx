import ColouredBox from './ColouredBox';
import './BoxGrid.css';

const randomColor = () => {
    let r = Math.floor(Math.random() * 255) + 1;
    let g = Math.floor(Math.random() * 255) + 1;
    let b = Math.floor(Math.random() * 255) + 1;
    return `rgb(${r}, ${g}, ${b})`;
}

export default function BoxGrid(){
    const boxes = []
    const numBoxes = 10

    const colorsArr = [];
    const numColors = 5;

   
    for (let i =0; i < numColors; i++) {
        colorsArr.push(randomColor());
    }

    console.log(colorsArr)

    for (let i = 0; i < numBoxes; i++) {
        boxes.push(<ColouredBox colorsArr={colorsArr}/>)
    }

    return (
        <div className="box-grid">{boxes}</div>
    )
}