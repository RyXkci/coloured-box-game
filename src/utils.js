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
      total: num
    };
    return result;
  };

  const timeStr = (timeObj) => {
    let str;
    if(timeObj.minutes === 1) {
      str = `It took you ${timeObj.minutes} minute and ${timeObj.seconds} seconds!`
    } else if (timeObj.minutes > 1) {
      str = `It took you ${timeObj.minutes} minutes and ${timeObj.seconds} seconds!`
    } else {
      str = `It took you ${timeObj.seconds} seconds!`
    }
    return str
  }





  export {randomColor, randomIdx, parseSeconds, timeStr};