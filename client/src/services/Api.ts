import axios from "axios";

const api = axios.create({
  baseURL: "https://noteappijal-fullstack.herokuapp.com",
  timeout: 2500,
  timeoutErrorMessage: "Timeout",
});

export default api;
