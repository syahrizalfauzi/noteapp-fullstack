import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import Home from "./components/HomePage/Home";
import Landing from "./components/LandingPage/Landing";
import AppState from "./models/AppState";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import UndefinedPage from "./components/UndefinedPage";
import { useEffect, useState } from "react";
// import ResetPasswordPage from "./components/ResetPasswordPage";

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
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const checkUserData = () => {
      setToken(localStorage.getItem("token"));
    };

    checkUserData();

    window.onstorage = checkUserData;

    return () => {
      window.onstorage = null;
    };
  }, [token]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppState.Provider>
          <Switch>
            <Route exact path="/">
              {token ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>
            <Route path="/login">
              {token ? <Redirect to="/home" /> : <Landing />}
            </Route>
            <Route path="/home">
              {token ? <Home /> : <Redirect to="/login" />}
            </Route>
            {/* <Route path="/resetpassword/:token">
              <ResetPasswordPage />
            </Route> */}
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
