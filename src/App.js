import logo from "./logo.svg";
import "./App.css";
import Grid from "./components/Grid/Grid.js";
import Header from "./components/Header/Header.js";
import { GridContextProvider } from "./contexts/gridContext";

function App() {
  return (
    <GridContextProvider>
      <div className="App">
        <Header></Header>
        <Grid></Grid>
      </div>
    </GridContextProvider>
  );
}

export default App;
