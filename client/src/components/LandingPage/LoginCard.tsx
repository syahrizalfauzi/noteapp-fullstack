import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { LandingCardProps } from "./Landing";
import { useHistory } from "react-router";
import { login } from "../../services/Auth";

export interface TextFormFieldProps {
  error: boolean | undefined;
  helperText: string;
}

const useStyles = makeStyles({
  loginContainer: {
    maxWidth: "360px",
    margin: "auto",
    height: "100%",
    display: "flex",
  },
  paper: {
    padding: "16px",
    margin: "auto",
  },
  textField: {
    width: "100%",
    margin: "8px 0",
  },
  buttonBar: {
    float: "right",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

const LoginCard = ({
  isActive,
  toggleActive,
  setSnackbar,
}: LandingCardProps) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameProps, setUsernameProps] = useState<TextFormFieldProps>({
    error: undefined,
    helperText: "",
  });
  const [passwordProps, setPasswordProps] = useState<TextFormFieldProps>({
    error: undefined,
    helperText: "",
  });
  const [isBusy, setIsBusy] = useState(false);

  const navigator = useHistory();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRegister = () => {
    toggleActive(false);
  };
  const clearErrorTexts = () => {
    setUsernameProps({ error: undefined, helperText: "" });
    setPasswordProps({ error: undefined, helperText: "" });
  };
  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setIsBusy(true);
    e.preventDefault();
    if (username.length === 0) {
      setIsBusy(false);
      return setUsernameProps({ error: true, helperText: "Username is empty" });
    }
    if (password.length === 0) {
      setIsBusy(false);
      return setPasswordProps({ error: true, helperText: "Password is empty" });
    }

    const loginResponse = await login(username, password);
    if (loginResponse.error) {
      setIsBusy(false);
      return setSnackbar({
        isOpened: true,
        message: loginResponse.message,
        severity: "error",
      });
    }
    localStorage.setItem("token", loginResponse.token!);
    localStorage.setItem("username", loginResponse.username!);
    window.dispatchEvent(new Event("storage"));
    setIsBusy(false);
    navigator.replace("/home");
  };

  return (
    <Paper
      className={classes.paper}
      style={{ display: isActive ? "block" : "none" }}
    >
      <Typography variant="h6" align="center">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          value={username}
          onChange={handleUsername}
          onClick={clearErrorTexts}
          label="Username"
          className={classes.textField}
          variant="outlined"
          {...usernameProps}
        />
        <TextField
          value={password}
          onChange={handlePassword}
          onClick={clearErrorTexts}
          label="Password"
          className={classes.textField}
          variant="outlined"
          type="password"
          {...passwordProps}
        />
        <div className={classes.buttonBar}>
          <Button onClick={handleRegister}>register</Button>
          {!isBusy ? (
            <Button type="submit" color="primary">
              login
            </Button>
          ) : (
            <div style={{ width: "64px", textAlign: "center" }}>
              <CircularProgress size={30} />
            </div>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default LoginCard;
