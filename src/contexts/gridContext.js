import React from "react";
import patternJSONImported from "../pattern.json";
const GridContext = React.createContext(null);

function fakeCall() {
  return patternJSONImported;
}

export const GridContextProvider = ({ children }) => {
  const [chosenGrowAmount, setChosenGrowAmount] = React.useState(5);
  const [chosenPattern, setChosenPattern] = React.useState("zigzag");
  const [chosenMode, setChosenMode] = React.useState("bubble");
  const patternJSON = fakeCall();

  const chosenGrowAmountObject = React.useMemo(
    () => ({ chosenGrowAmount, setChosenGrowAmount }),
    [chosenGrowAmount]
  );

  const chosenPatternObject = React.useMemo(
    () => ({ chosenPattern, setChosenPattern }),
    [chosenPattern]
  );

  const chosenModeObject = React.useMemo(
    () => ({ chosenMode, setChosenMode }),
    [chosenMode]
  );

  return (
    <GridContext.Provider
      value={{
        chosenGrowAmountObject,
        chosenPatternObject,
        chosenModeObject,
        patternJSON,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export default GridContext;
