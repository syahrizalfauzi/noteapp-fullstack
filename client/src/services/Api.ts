import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 2500,
  timeoutErrorMessage: "Timeout",
});

export default api;
