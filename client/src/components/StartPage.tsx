import { useSelector } from "react-scoped-model";
import AppState from "../models/AppState";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const StartPage = () => {
  const setUser = useSelector(AppState, (state) => state.setCurrentUser);
  const navigator = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      //MAKE API CALL & FETCH USER INFO
      setUser({
        // name: "nama",
        // username: "username",
        // id: "id",
        token,
      });
      return navigator.replace("/home");
    }
    return navigator.replace("/login");
  }, [navigator, setUser]);

  return <div></div>;
};

export default StartPage;
