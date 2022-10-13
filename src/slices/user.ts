import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../utils/customer_services/user.service";
import { RootState } from "../app/store";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

const getTokenDataFromLocalStorage = () => {
  const tokenData = localStorage.getItem("tokenData")
    ? JSON.parse(localStorage.getItem("tokenData")!)
    : null;
  return tokenData;
};

const initialState = {
  token: null, //getTokenDataFromLocalStorage,
  tokenExpiredTime: null,
  loginLoading: false,
  user: {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  },
};

const BASE_URL = "http://localhost:3000/users/:token:";

export const sendMagicEmail = createAsyncThunk(
  "user/sendEmail",
  async (email: string) => {
    const response = await userApi.sendEmail({
      email: email,
      base_url: BASE_URL,
    });
    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (arg: { email: string; password: string }) => {
    const { email, password } = arg;
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    return response;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (arg: { email: string; password: string }) => {
    const { email, password } = arg;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
    return response;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, payload) => ({
      ...state,
      loginLoading: false,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
