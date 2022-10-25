import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "../firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { User } from "../models/user";
import { RootState } from "../store/store";
import { UserCredential } from "firebase/auth";

const getTokenDataFromLocalStorage = () => {
  const tokenData = localStorage.getItem("tokenData")
    ? JSON.parse(localStorage.getItem("tokenData")!)
    : null;
  return tokenData;
};

const initialState = {
  token: null, //getTokenDataFromLocalStorage,
  tokenExpiredTime: null,
  userLoading: false,
  info: {
    id: "",
    name: "",
    email: "",
    cart_id: "",
  } as User,
};

export const login = createAsyncThunk(
  "user/login",
  async (arg: { email: string; password: string }) => {
    console.log("login");
    const { email, password } = arg;
    const response = await signInWithEmailAndPassword(auth, email, password);
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

    return JSON.parse(JSON.stringify(response.user));
  }
);

export const setUserInfo = createAsyncThunk(
  "user/setInfo",
  async (name: string, { getState }) => {
    const { id } = (getState() as RootState).user.info;
    const cart_id = (getState() as RootState).cart.id;
    console.log(id);
    console.log(cart_id);
    const database = getDatabase();
    set(ref(database, "users/" + id), {
      name: name,
      cart_id: cart_id,
    });
    return { name: name, cart_id: cart_id };
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getInfo",
  async (no_arg, { getState }) => {
    const { id } = (getState() as RootState).user.info;
    console.log(id);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
      userLoading: true,
    }));
    builder.addCase(login.fulfilled, (state, { payload }) => ({
      ...state,
      token: (payload as any).user.accessToken,
      user: {
        ...state.info,
        id: (payload as any).user.uid,
        email: (payload as any).user.email,
      },
      userLoading: false,
    }));
    builder.addCase(login.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
    //sign up
    builder.addCase(signup.pending, (state, { payload }) => ({
      ...state,

      userLoading: true,
    }));
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      return {
        ...state,
        token: (payload as any).accessToken,
        info: {
          ...state.info,
          id: (payload as any).uid,
          email: (payload as any).email,
        },
        userLoading: false,
      };
    });
    builder.addCase(signup.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
    //set info
    builder.addCase(setUserInfo.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(setUserInfo.fulfilled, (state, { payload }) => ({
      ...state,
      user: {
        ...state.info,
        name: payload.name,
        cart_id: payload.cart_id,
      },
      userLoading: false,
    }));
    builder.addCase(setUserInfo.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
    //get info
    builder.addCase(getUserInfo.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => ({
      ...state,

      userLoading: false,
    }));
    builder.addCase(getUserInfo.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
