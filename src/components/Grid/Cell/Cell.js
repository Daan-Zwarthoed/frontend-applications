import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";
import GridContext from "../../../contexts/gridContext";

let chosenGrowAmount = 5;
let chosenMode = "bubble";
let newNeighboursArray = [];
const transitioningElementsArray = [];

// Takes hex code and returns rgb
const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

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
    let neighbours = getNeighbours(event.target);
    let nextNeighbours = [];
    let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    transitioningElementsArray.push(hex2rgb(randomColor));
    if (transitioningElementsArray.includes(event.target.style.backgroundColor))
      transitioningElementsArray.splice(event.target.style.backgroundColor, 1);

    // Changes clicked targets color
    if (!event.target.classList.contains("patternLine"))
      event.target.style.backgroundColor = randomColor;

    for (let iGrowAmount = 0; iGrowAmount < chosenGrowAmount; iGrowAmount++) {
      // Set timeout ensures it grows 1 by 1
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        neighbours.forEach((element) => {
          if (element) {
            nextNeighbours.push(
              ...getNeighbours(element, hex2rgb(randomColor))
            );
          }
        });
        neighbours = nextNeighbours;
        nextNeighbours = [];
        if (iGrowAmount === chosenGrowAmount - 1) {
          transitioningElementsArray.splice(hex2rgb(randomColor), 1);
        }
      }, 50 * iGrowAmount);
    }
  }
}

const Cell = (props) => {
  chosenGrowAmount = React.useContext(GridContext)[0].chosenGrowAmount;
  chosenMode = React.useContext(GridContext)[2].chosenMode;
  return (
    <div className={`${props.className} Cell`} onClick={clickEventStart}></div>
  );
};

Cell.propTypes = {};

Cell.defaultProps = {};

export default Cell;
