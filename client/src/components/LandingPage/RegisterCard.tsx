import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { LandingCardProps } from "./Landing";
import { TextFormFieldProps } from "./LoginCard";
import { register } from "../../services/Auth";

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

const RegisterCard = ({
  isActive,
  toggleActive,
  setSnackbar,
}: LandingCardProps) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [usernameProps, setUsernameProps] = useState<TextFormFieldProps>({
    error: undefined,
    helperText: "",
  });
  const [passwordProps, setPasswordProps] = useState<TextFormFieldProps>({
    error: undefined,
    helperText: "",
  });
  const [confirmProps, setConfirmProps] = useState<TextFormFieldProps>({
    error: undefined,
    helperText: "",
  });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.target.value);
  };
  const handleLogin = () => {
    toggleActive(true);
  };
  const handleRegister = async (e: React.ChangeEvent<HTMLFormElement>) => {
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
    if (confirm.length === 0) {
      setIsBusy(false);
      return setConfirmProps({
        error: true,
        helperText: "Password confirmation is empty",
      });
    }
    if (password !== confirm) {
      setIsBusy(false);
      return setConfirmProps({
        error: true,
        helperText: "Password confirmation is not the same as password",
      });
    }
    const registerResponse = await register(username, password);
    if (registerResponse.error) {
      setIsBusy(false);
      return setSnackbar({
        isOpened: true,
        message: registerResponse.message,
        severity: "error",
      });
    }
    setIsBusy(false);
    setSnackbar({
      isOpened: true,
      message: "User registration success, please log in",
      severity: "success",
    });
    handleLogin();
  };

  const clearErrorTexts = () => {
    setUsernameProps({ error: undefined, helperText: "" });
    setPasswordProps({ error: undefined, helperText: "" });
    setConfirmProps({ error: undefined, helperText: "" });
  };

  return (
    <Paper
      className={classes.paper}
      style={{ display: isActive ? "block" : "none" }}
    >
      <Typography variant="h6" align="center">
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          value={username}
          onChange={handleUsername}
          label="Username"
          className={classes.textField}
          variant="outlined"
          onClick={clearErrorTexts}
          inputProps={{
            maxLength: 20,
          }}
          {...usernameProps}
        />
        <TextField
          value={password}
          onChange={handlePassword}
          label="Password"
          className={classes.textField}
          variant="outlined"
          type="password"
          onClick={clearErrorTexts}
          {...passwordProps}
        />
        <TextField
          value={confirm}
          onChange={handleConfirmPassword}
          label="Confirm password"
          className={classes.textField}
          variant="outlined"
          type="password"
          onClick={clearErrorTexts}
          {...confirmProps}
        />
        <div className={classes.buttonBar}>
          <Button onClick={handleLogin}>login</Button>
          {!isBusy ? (
            <Button type="submit" color="primary">
              register
            </Button>
          ) : (
            <div style={{ width: "83px", textAlign: "center" }}>
              <CircularProgress size={30} />
            </div>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default RegisterCard;
