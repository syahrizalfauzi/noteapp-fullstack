import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const StartPage = () => {
  const navigator = useHistory();

  useEffect(() => {
    console.log("checking token");
    const token = localStorage.getItem("token");
    if (token) {
      return navigator.replace("/home");
    }
    return navigator.replace("/login");
  }, [navigator]);

  return <div></div>;
};

export default StartPage;
