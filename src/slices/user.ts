import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../utils/customer_services/user.service";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";

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

export const login = createAsyncThunk(
  "user/login",
  async (arg: { email: string; password: string }) => {
    console.log("login");
    const { email, password } = arg;
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
    return response;
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (arg: { email: string; password: string }) => {
    console.log("signup");
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
    builder.addCase(login.pending, (state, { payload }) => ({
      ...state,
      loginLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      token: (payload as any).accessToken,
      user: {
        ...state.user,
        email: (payload as any).email,
      },
      loginLoading: false,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));
    builder.addCase(signup.pending, (state, { payload }) => ({
      ...state,

      loginLoading: true,
    }));
    builder.addCase(signup.fulfilled, (state, { payload }) => ({
      ...state,
      token: (payload as any).accessToken,
      user: {
        ...state.user,
        email: (payload as any).email,
      },
      loginLoading: false,
    }));
    builder.addCase(signup.rejected, (state) => ({
      ...state,
      loginLoading: false,
    }));
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
