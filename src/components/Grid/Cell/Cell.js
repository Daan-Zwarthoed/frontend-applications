import React from "react";
import PropTypes from "prop-types";
import "./Cell.css";

let chosenGrowAmount = 5;
let newNeighboursArray = [];

const hex2rgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

function addElementOrNot(element, randomColor) {
  if (element) {
    if (element.style.backgroundColor) {
      if (element.style.backgroundColor !== randomColor) {
        newNeighboursArray.push(element);
      }
    } else {
      newNeighboursArray.push(element);
    }
  }
}

function getNeighbours(target, randomColor) {
  newNeighboursArray = [];
  addElementOrNot(target.nextSibling, randomColor);
  addElementOrNot(target.previousSibling, randomColor);
  if (target.parentElement.nextSibling) {
    addElementOrNot(
      target.parentElement.nextSibling.children[target.className.split(" ")[0]],
      randomColor
    );
  }
  if (target.parentElement.previousSibling) {
    addElementOrNot(
      target.parentElement.previousSibling.children[
        target.className.split(" ")[0]
      ],
      randomColor
    );
  }
  return newNeighboursArray;
}

function clickEventStart(event) {
  let neighbours = getNeighbours(event.target);
  let nextNeighbours = [];
  let randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  event.target.style.backgroundColor = randomColor;
  for (let iGrowAmount = 0; iGrowAmount < chosenGrowAmount; iGrowAmount++) {
    // eslint-disable-next-line no-loop-func
    setTimeout(() => {
      neighbours.forEach((element) => {
        if (element) {
          element.style.backgroundColor = randomColor;
          nextNeighbours.push(...getNeighbours(element, hex2rgb(randomColor)));
        }
      });
      neighbours = nextNeighbours;
      nextNeighbours = [];
    }, 100 * iGrowAmount);
  }
}

const Cell = ({ className }) => {
  return <div className={`${className} Cell`} onClick={clickEventStart}></div>;
};

Cell.propTypes = {};

Cell.defaultProps = {};

export default Cell;
