import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";
import userApi from "../../api/userApi";
import { RootState } from "../../app/store";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

const initialState: User = {
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
};

const BASE_URL = "http://localhost:3000/users/:token:";

export const sendMagicEmail = createAsyncThunk(
  "user/sendEmail",
  async (email: string) => {
    console.log(email);
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
