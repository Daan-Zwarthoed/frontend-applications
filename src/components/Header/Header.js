import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import GridContext from "../../contexts/gridContext";

const Header = () => {
  const { setChosenGrowAmount } =
    React.useContext(GridContext).chosenGrowAmountObject;
  const { setChosenPattern } =
    React.useContext(GridContext).chosenPatternObject;
  const { setChosenMode } = React.useContext(GridContext).chosenModeObject;
  return (
    <div className="Header">
      {/* Chose the amount you want the square to grow */}
      <label htmlFor="chosenGrowAmount">Grow amount:</label>
      <input
        type="number"
        defaultValue="5"
        onChange={(event) => setChosenGrowAmount(event.target.value)}
      ></input>

      {/* Choose the pattern you want displayed */}
      <label htmlFor="patterns">Pattern:</label>
      <select
        name="patterns"
        onChange={(event) => setChosenPattern(event.target.value)}
      >
        <option value="zigzag">Zig zag</option>
        <option value="diagonalZigzag">Diagonal zig zag</option>
        <option value="none">None</option>
      </select>

      {/* Choose between bubble or pattern */}
      <div className="bubbleOrPattern">
        <p>Bubble</p>
        <label className="switch">
          <input
            id="bubbleOrPatternCheckbox"
            type="checkbox"
            onChange={(event) =>
              setChosenMode(event.target.checked ? "pattern" : "bubble")
            }
          />
          <span></span>
        </label>
        <p>Pattern</p>
      </div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
