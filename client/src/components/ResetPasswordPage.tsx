import { useParams } from "react-router";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import jwt from "jsonwebtoken";
import { resetPassword } from "../services/Auth";
import React, { useState } from "react";

interface TextFormFieldProps {
  error: boolean | undefined;
  helperText: string;
}

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>();
  let username: string;
  const [password, setPassword] = useState("");
  const [passwordProps, setPasswordProps] = useState<TextFormFieldProps>({
    error: undefined,
    helperText: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [
    confirmPasswordProps,
    setConfirmPasswordProps,
  ] = useState<TextFormFieldProps>({ helperText: "", error: undefined });
  const [message, setMessage] = useState("");

  function clearErrorTexts() {
    setPasswordProps({ error: undefined, helperText: "" });
    setConfirmPasswordProps({ error: undefined, helperText: "" });
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  async function handleFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length === 0) {
      setPasswordProps({ error: true, helperText: "Password empty" });
    }
    if (confirmPassword.length === 0) {
      setConfirmPasswordProps({
        error: true,
        helperText: "Confirmation password empty",
      });
    }
    const response = await resetPassword(password, token);
    setMessage(response.message);
  }

  function renderContent() {
    let valid: boolean = true;

    if (!token) valid = false;

    console.log(token);

    if (valid)
      jwt.verify(token, "resetpasswordsecret", (error, decoded: any) => {
        if (error) return (valid = false);
        username = decoded.username;
      });

    if (!valid)
      return (
        <>
          <Typography variant="h1">
            Token sudah tidak valid, silahkan isi form lupa password lagi
          </Typography>
        </>
      );

    return (
      <>
        <Typography variant="h1">Reset password</Typography>
        <Typography>{username}</Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            value={password}
            onChange={handlePassword}
            onClick={clearErrorTexts}
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="new-password"
            {...passwordProps}
          />
          <TextField
            value={confirmPassword}
            onChange={handleConfirmPassword}
            onClick={clearErrorTexts}
            label="Confirm password"
            variant="outlined"
            type="password"
            autoComplete="new-password"
            {...confirmPasswordProps}
          />
          <Button type="submit" color="primary">
            Submit
          </Button>
          {message ? <Typography>{message}</Typography> : null}
        </form>
      </>
    );
  }

  return <Container>{renderContent()}</Container>;
};

export default ResetPasswordPage;
