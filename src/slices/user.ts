import { CaseReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAppDatabase,
} from "../firebase";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { User } from "../models/user";
import { RootState } from "../store/store";

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

export const logIn = createAsyncThunk(
  "user/login",
  async (arg: { email: string; password: string }) => {
    console.log("login");
    const { email, password } = arg;
    const response = await signInWithEmailAndPassword(auth, email, password);
    return JSON.parse(JSON.stringify(response.user));
  }
);

export const signUp = createAsyncThunk(
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
    const database = getAppDatabase();
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
    const dbRef = ref(getAppDatabase());
    const response = await (await get(child(dbRef, `users/${id}`))).val();
    if (!response) return undefined;
    return response;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(logIn.pending, (state, { payload }) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
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

    builder.addCase(logIn.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
    //sign up
    builder.addCase(signUp.pending, (state, { payload }) => ({
      ...state,

      userLoading: true,
    }));
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
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
    builder.addCase(signUp.rejected, (state) => ({
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
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      return {
        ...state,
        user: {
          ...state.info,
          //name: payload.name,
          //cart_id: payload.cart_id,
        },
        userLoading: false,
      };
    });

    builder.addCase(getUserInfo.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
