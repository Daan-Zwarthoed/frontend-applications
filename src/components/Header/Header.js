import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import GridContext from "../../contexts/gridContext";

const Header = () => {
  const { setChosenGrowAmount } = React.useContext(GridContext);
  const changeHandler = (event) => setChosenGrowAmount(event.target.value);
  return (
    <div className="Header">
      <input type="number" defaultValue="5" onChange={changeHandler}></input>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
