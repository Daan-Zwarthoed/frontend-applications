import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import Cell from "./Cell/Cell.js";
import GridContext from "../../contexts/gridContext";
import drawPattern from "./drawGridPattern.js";

let cellArray = [];
let rowArray = [];
let chosenPatternSave;

// Finds the needed cells for the width
for (let iWidth = 20; iWidth <= window.innerWidth - 40; iWidth = iWidth + 20) {
  cellArray.push(
    <Cell key={iWidth / 20 - 1} className={iWidth / 20 - 1}></Cell>
  );
}

// Finds the needed cells for the height
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

const Grid = () => {
  // Takes the chosenpattern and the json file and makes the chosen pattern
  const { chosenPattern } = React.useContext(GridContext).chosenPatternObject;
  const patternJSON = React.useContext(GridContext).patternJSON;
  React.useEffect(() => {
    if (chosenPatternSave !== chosenPattern) {
      drawPattern(chosenPattern, patternJSON);
      chosenPatternSave = chosenPattern;
    }
  });

  return <div className="Grid">{rowArray}</div>;
};

Grid.propTypes = {};

Grid.defaultProps = {};

export default Grid;
