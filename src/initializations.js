const generateColors = (numColors) => {
    let colorsArr = [];
    for (let i = 0; i < numColors; i++) {
      colorsArr.push(randomColor());
    }
    return colorsArr;
  };

  const generateBoxes = (numBoxes) => {
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

  export {generateColors, generateBoxes};