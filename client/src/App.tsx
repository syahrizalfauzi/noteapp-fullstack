import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import Home from "./components/HomePage/Home";
import Landing from "./components/LandingPage/Landing";
import AppState from "./models/AppState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import UndefinedPage from "./components/UndefinedPage";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[400],
    },
    secondary: {
      main: red[400],
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppState.Provider>
          <Switch>
            <Route exact path="/">
              <StartPage />
            </Route>
            <Route path="/login">
              <Landing />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="*">
              <UndefinedPage />
            </Route>
          </Switch>
        </AppState.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
