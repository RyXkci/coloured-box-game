# The Coloured Box Game

## What is this?
A small game I created using REACTJS

## How does it work?
You pick the number of boxes and colours and the app will generate a box grid with your chosen amount of boxes and a random assortment of background colours, all coming from an array with randomly generated colors the amount you chose.
Click on the boxes to change the background colours, when they are all the same, the game "ends" and you get the time it took! At this point you can try again and try and beat your score. Or reset and choose a new "difficulty level" (aka the number of boxes and colors).

The app initially renders a form with the two number selectors and a boolean saved in state. As soon as you hit submit, the boolean switches and it renders the box grid component, passing down the boolean, number of boxes and number of colors as props. The boxgrid generates the "box" objects and renders the seperate boxes with functions as props that change the colour. There are two effects, one that iterates over the array after the background change and one that sets a "stopwatch" to count the seconds, which are then parsed in to "minutes" and "seconds".

It uses session storage to save all youtr "scores" in that session.