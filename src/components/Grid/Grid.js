import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import Cell from "./Cell/Cell.js";
import GridContext from "../../contexts/gridContext";
import drawPattern from "./drawGridPattern.js";

let cellArray = [];
let rowArray = [];

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

const Grid = () => {
  const { chosenPattern } = React.useContext(GridContext)[1];
  const patternJSON = React.useContext(GridContext)[2];
  React.useEffect(() => {
    drawPattern(chosenPattern, patternJSON);
  });

  return <div className="Grid">{rowArray}</div>;
};

Grid.propTypes = {};

Grid.defaultProps = {};

export default Grid;