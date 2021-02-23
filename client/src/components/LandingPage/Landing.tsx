import { useState } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import MuiAlert, { Color } from "@material-ui/lab/Alert";

import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";

export interface LandingCardProps {
  isActive: boolean;
  toggleActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarNotifier>>;
}
interface SnackbarNotifier {
  isOpened: boolean;
  message: string;
  severity: Color | undefined;
}

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [snackbar, setSnackbar] = useState<SnackbarNotifier>({
    isOpened: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((state) => ({ ...state, isOpened: false }));
  };

  return (
    <div
      style={{
        maxWidth: "360px",
        margin: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <RegisterCard
        isActive={!isLogin}
        toggleActive={setIsLogin}
        setSnackbar={setSnackbar}
      />
      <LoginCard
        isActive={isLogin}
        toggleActive={setIsLogin}
        setSnackbar={setSnackbar}
      />
      <Snackbar
        open={snackbar.isOpened}
        onClose={handleCloseSnackbar}
        autoHideDuration={4000}
      >
        <Typography>
          <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
            <Typography component="span">{snackbar.message}</Typography>
          </MuiAlert>
        </Typography>
      </Snackbar>
    </div>
  );
};

export default Landing;
