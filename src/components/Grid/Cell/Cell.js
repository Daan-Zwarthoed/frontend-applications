import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";
import GridContext from "../../../contexts/gridContext";

let chosenGrowAmount = 5;
let chosenMode = "bubble";
let newNeighboursArray = [];
const transitioningElementsArray = [];

// Returns a random rgb
// https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function randomRGB() {
  const randomBetween = (min, max) =>
    min + Math.floor(Math.random() * (max - min + 1));
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

// All the checks if the element should be added or not
function addElementOrNot(element, randomColor) {
  if (element) {
    if (
      element.style.backgroundColor ||
      element.classList.contains("patternLine")
    ) {
      if (
        element.style.backgroundColor !== randomColor &&
        !element.classList.contains("patternLine") &&
        !transitioningElementsArray.includes(element.style.backgroundColor)
      ) {
        element.style.backgroundColor = randomColor;
        newNeighboursArray.push(element);
      }
    } else {
      element.style.backgroundColor = randomColor;
      newNeighboursArray.push(element);
    }
  }
}

// Gets all the neighbours
function getNeighbours(target, randomColor) {
  newNeighboursArray = [];
  addElementOrNot(target.nextSibling, randomColor); // Right
  addElementOrNot(target.previousSibling, randomColor); // Left
  if (target.parentElement.nextSibling) {
    addElementOrNot(
      target.parentElement.nextSibling.children[target.className.split(" ")[0]],
      randomColor
    ); // Bellow
  }
  if (target.parentElement.previousSibling) {
    addElementOrNot(
      target.parentElement.previousSibling.children[
        target.className.split(" ")[0]
      ],
      randomColor
    ); // Above
  }
  return newNeighboursArray;
}

// Starts bubbling the square or toggles the pattern line.
function clickEventStart(event) {
  if (chosenMode === "pattern") {
    event.target.classList.toggle("patternLine");
  } else {
    const randomColor = randomRGB();
    if (transitioningElementsArray.includes(event.target.style.backgroundColor))
      transitioningElementsArray.splice(event.target.style.backgroundColor, 1);
    transitioningElementsArray.push(randomColor);
    let neighbours = getNeighbours(event.target);
    let nextNeighbours = [];

    // Changes clicked targets color
    if (
      !event.target.classList.contains("patternLine") &&
      !transitioningElementsArray.includes(event.target.style.backgroundColor)
    )
      event.target.style.backgroundColor = randomColor;

    for (let iGrowAmount = 0; iGrowAmount < chosenGrowAmount; iGrowAmount++) {
      // Set timeout ensures it grows 1 by 1
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        neighbours.forEach((element) => {
          if (element) {
            nextNeighbours.push(...getNeighbours(element, randomColor));
          }
        });
        neighbours = nextNeighbours;
        nextNeighbours = [];
        if (iGrowAmount === chosenGrowAmount - 1 || !neighbours[0]) {
          transitioningElementsArray.splice(randomColor, 1);
        }
      }, 50 * iGrowAmount);
    }
  }
}

const Cell = (props) => {
  chosenGrowAmount =
    React.useContext(GridContext).chosenGrowAmountObject.chosenGrowAmount;
  chosenMode = React.useContext(GridContext).chosenModeObject.chosenMode;
  return (
    <div className={`${props.className} Cell`} onClick={clickEventStart}></div>
  );
};

Cell.propTypes = {};

Cell.defaultProps = {};

export default Cell;
