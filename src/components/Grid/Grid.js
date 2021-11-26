import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import Cell from "./Cell/Cell.js";
import GridContext from "../../contexts/gridContext";

let cellArray = [];
let rowArray = [];
let chosenPattern;
let patternJSON;

for (let iWidth = 20; iWidth <= window.innerWidth - 40; iWidth = iWidth + 20) {
  cellArray.push(
    <Cell key={iWidth / 20 - 1} className={iWidth / 20 - 1}></Cell>
  );
}

for (
  let iHeight = 20;
  iHeight <= window.innerHeight - 40;
  iHeight = iHeight + 20
) {
  rowArray.push(
    <div key={iHeight / 20 - 1} className={`${iHeight / 20 - 1} row`}>
      {cellArray}
    </div>
  );
}

function returnNextCell(path, nextCell) {
  switch (path) {
    case "right":
      if (nextCell.nextSibling) return nextCell.nextSibling;
      break;
    case "left":
      if (nextCell.previousSibling) return nextCell.previousSibling;
      break;
    case "up":
      if (nextCell.parentElement.previousSibling)
        return nextCell.parentElement.previousSibling.children[
          nextCell.className.split(" ")[0]
        ];
      break;
    case "down":
      if (nextCell.parentElement.nextSibling)
        return nextCell.parentElement.nextSibling.children[
          nextCell.className.split(" ")[0]
        ];
      break;
    case "upRight":
      if (nextCell.parentElement.previousSibling)
        return nextCell.parentElement.previousSibling.children[
          +nextCell.className.split(" ")[0] + 1
        ];
      break;
    case "upLeft":
      if (nextCell.parentElement.previousSibling)
        return nextCell.parentElement.previousSibling.children[
          nextCell.className.split(" ")[0] - 1
        ];
      break;
    case "downRight":
      if (nextCell.parentElement.nextSibling)
        return nextCell.parentElement.nextSibling.children[
          +nextCell.className.split(" ")[0] + 1
        ];
      break;
    case "downLeft":
      if (nextCell.parentElement.nextSibling)
        return nextCell.parentElement.nextSibling.children[
          nextCell.className.split(" ")[0] - 1
        ];
      break;
    default:
      return;
  }
}

function returnNextCellActivator(step, nextCell) {
  if (returnNextCell(step.path, nextCell)) {
    return returnNextCell(step.path, nextCell);
  } else if (step.elsePath) {
    return returnNextCell(step.elsePath, nextCell);
  }
}

function clearCountry() {
  document.querySelectorAll(".patternLine").forEach((element) => {
    element.classList.remove("patternLine");
  });
}

function drawCountry() {
  clearCountry();
  const startCell = document.querySelector(".Grid").children[0].children[0];
  let nextCell = startCell;
  let patternDone = false;
  patternJSON.forEach((pattern) => {
    if (pattern.pattern === chosenPattern) {
      pattern.start.forEach((step) => {
        for (let i = 0; i < step.amount; i++) {
          if (returnNextCellActivator(step, nextCell)) {
            nextCell = returnNextCellActivator(step, nextCell);
          } else {
            step.amount = 10001;
          }
        }
      });
      for (
        let indexPatternRepeat = 0;
        indexPatternRepeat < 1000;
        indexPatternRepeat++
      ) {
        // eslint-disable-next-line no-loop-func
        pattern.path.forEach((step) => {
          if (!patternDone) {
            for (let i = 0; i < step.amount; i++) {
              if (returnNextCellActivator(step, nextCell)) {
                nextCell = returnNextCellActivator(step, nextCell);
                if (!step.display) nextCell.classList.add("patternLine");
              } else if (step.display) {
                patternDone = true;
                indexPatternRepeat = 10001;
              } else {
                step.amount = 10001;
              }
            }
          }
        });
      }
    }
  });
}

const Grid = () => {
  chosenPattern = React.useContext(GridContext)[1].chosenPattern;
  patternJSON = React.useContext(GridContext)[2].patternJSON;
  React.useEffect(() => {
    drawCountry();
  });

  return <div className="Grid">{rowArray}</div>;
};

Grid.propTypes = {};

Grid.defaultProps = {};

export default Grid;
