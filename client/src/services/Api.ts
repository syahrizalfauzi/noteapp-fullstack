import axios from "axios";

const api = axios.create({
  // baseURL: "https://noteappijal-fullstack.herokuapp.com",
  baseURL: "http://localhost:5000",
  timeout: 2500,
  timeoutErrorMessage: "Timeout",
});

export default api;
