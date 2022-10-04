import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Authorization": "pk_test_46647c7cc96afa71e31bd1cecb6e48a69a1b749bfdbde",
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: headers,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
