import React from "react";
import patternJSONImported from "../pattern.json";
const GridContext = React.createContext(null);

function fakeCall() {
  return patternJSONImported;
}

export const GridContextProvider = ({ children }) => {
  const [chosenGrowAmount, setChosenGrowAmount] = React.useState(5);
  const [chosenPattern, setChosenPattern] = React.useState("zigzag");
  const patternJSON = fakeCall();

  const chosenGrowAmountObject = React.useMemo(
    () => ({ chosenGrowAmount, setChosenGrowAmount }),
    [chosenGrowAmount]
  );

  const chosenPatternObject = React.useMemo(
    () => ({ chosenPattern, setChosenPattern }),
    [chosenPattern]
  );

  return (
    <GridContext.Provider
      value={[chosenGrowAmountObject, chosenPatternObject, patternJSON]}
    >
      {children}
    </GridContext.Provider>
  );
};

export default GridContext;
