import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "X-Authorization": process.env.REACT_APP_SECRET_KEY!,
};

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: headers,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosAdmin.interceptors.response.use(
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

export default axiosAdmin;
