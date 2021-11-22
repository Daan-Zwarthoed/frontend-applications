import React from "react";
import PropTypes from "prop-types";
import "./Grid.css";
import Cell from "./Cell/Cell.js";

let CellArray = [];

for (let i = 0; i < 500; i++) {
  CellArray.push(<Cell></Cell>);
}

const Grid = () => {
  return <div class="Grid">{CellArray}</div>;
};

Grid.propTypes = {};

Grid.defaultProps = {};

export default Grid;
