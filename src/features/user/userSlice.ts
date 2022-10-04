import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userApi from "../../api/user_api/userApi";
import { RootState } from "../../app/store";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

const initialState = {
  isLogin: false,
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
