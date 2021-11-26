import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import GridContext from "../../contexts/gridContext";

const Header = () => {
  const { setChosenGrowAmount } = React.useContext(GridContext)[0];
  const chosenGrowAmountChangeHandler = (event) =>
    setChosenGrowAmount(event.target.value);

  const { setChosenPattern } = React.useContext(GridContext)[1];
  const chosenPatternChangeHandler = (event) => {
    setChosenPattern(event.target.value);
  };
  return (
    <div className="Header">
      <input
        type="number"
        defaultValue="5"
        onChange={chosenGrowAmountChangeHandler}
      ></input>
      <label for="patterns">Pattern:</label>
      <select name="patterns" onChange={chosenPatternChangeHandler}>
        <option value="zigzag">Zig zag</option>
        <option value="diagonalZigzag">Diagonal zig zag</option>
        <option value="none">none</option>
      </select>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
