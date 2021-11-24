import React from "react";

const GridContext = React.createContext(null);

export const GridContextProvider = ({ children }) => {
  const [chosenGrowAmount, setChosenGrowAmount] = React.useState(5);

  const value = React.useMemo(
    () => ({ chosenGrowAmount, setChosenGrowAmount }),
    [chosenGrowAmount]
  );

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

export default GridContext;
