import axios from "axios";
import { toast } from "react-toastify";
// import * as Sentry from "@sentry/react";

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (expectedError) {
    // Sentry.captureException(error);
    console.log("Logging the error", error);
    // toast.error("An unexpected error occurred.");
    alert("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  //   setJwt,
};

export default http;
