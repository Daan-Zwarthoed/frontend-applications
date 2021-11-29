import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import GridContext from "../../contexts/gridContext";

const Header = () => {
  const { setChosenGrowAmount } = React.useContext(GridContext)[0];
  const { setChosenPattern } = React.useContext(GridContext)[1];
  return (
    <div className="Header">
      <label for="chosenGrowAmount">Grow amount:</label>
      <input
        type="number"
        defaultValue="5"
        onChange={(event) => setChosenGrowAmount(event.target.value)}
      ></input>
      <label for="patterns">Pattern:</label>
      <select
        name="patterns"
        onChange={(event) => setChosenPattern(event.target.value)}
      >
        <option value="zigzag">Zig zag</option>
        <option value="diagonalZigzag">Diagonal zig zag</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
