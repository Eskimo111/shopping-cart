import { CaseReducer, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAppDatabase,
} from "../firebase";
import { child, get, ref, set } from "firebase/database";
import {
  FirebaseUser,
  FireBaseUserData,
  GoogleUser,
  User,
} from "../models/user";
import { RootState } from "../store/store";
import {
  GoogleAuthProvider,
  signInWithCustomToken,
  signInWithPopup,
} from "firebase/auth";

const getTokenDataFromLocalStorage = () => {
  const tokenData = localStorage.getItem("tokenData")
    ? JSON.parse(localStorage.getItem("tokenData")!)
    : null;
  return tokenData;
};

const initialState: User = {
  token: null,
  tokenExpiredTime: null,
  userLoading: false,
  info: {
    id: "",
    name: "",
    email: "",
    cart_id: "",
    role: "CM",
  },
};

export const signIn = createAsyncThunk(
  "user/signin",
  async (arg: { email: string; password: string }): Promise<FirebaseUser> => {
    console.log("signIn");
    const { email, password } = arg;
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      token: await user.getIdToken(),
    };
  }
);

export const signInWithToken = createAsyncThunk(
  "user/signin-with-token",
  async (token: string): Promise<FirebaseUser> => {
    console.log("signIn with token");
    const { user } = await signInWithCustomToken(auth, token);
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      token: await user.getIdToken(),
    };
  }
);

export const signInWithGoogle = createAsyncThunk(
  "user/signin-with-google",
  async (): Promise<GoogleUser> => {
    console.log("signIn with google");
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    return {
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      token: await user.getIdToken(),
    };
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async (arg: { email: string; password: string }): Promise<FirebaseUser> => {
    const { email, password } = arg;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = response;
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      token: await user.getIdToken(),
    };
  }
);

export const setUserInfo = createAsyncThunk(
  "user/setInfo",
  async (name: string, { getState }): Promise<FireBaseUserData> => {
    const { id } = (getState() as RootState).user.info;
    const cart_id = (getState() as RootState).cart.id;
    const database = getAppDatabase();
    if (id)
      set(ref(database, `users/${id}`), {
        name: name,
        cart_id: cart_id,
        role: "CM",
      });
    return { name: name, cart_id: cart_id, role: "CM" };
  }
);

export const getUserInfo = createAsyncThunk(
  "user/getInfo",
  async (no_arg, { getState }): Promise<FireBaseUserData> => {
    const { id } = (getState() as RootState).user.info;
    const dbRef = ref(getAppDatabase());
    const response = await (await get(child(dbRef, `users/${id}`))).val();
    if (!response) throw "Error. Can't get user info from Realtime Database.";
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
    // signIn
    builder.addCase(signIn.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(signIn.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload.token,
      info: {
        ...state.info,
        id: payload.uid,
        email: payload.email ?? "",
      },
      userLoading: false,
    }));
    builder.addCase(signIn.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));

    //sign in with token
    builder.addCase(signInWithToken.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(signInWithToken.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload.token,
      info: {
        ...state.info,
        id: payload.uid,
        email: payload.email ?? "",
      },
      userLoading: false,
    }));
    builder.addCase(signInWithToken.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));

    //sign in with google
    builder.addCase(signInWithGoogle.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(signInWithGoogle.fulfilled, (state, { payload }) => ({
      ...state,
      token: payload.token,
      info: {
        ...state.info,
        name: payload.displayName ?? "anonymous",
        id: payload.uid,
        email: payload.email ?? "",
      },
      userLoading: false,
    }));
    builder.addCase(signInWithGoogle.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
    //sign up
    builder.addCase(signUp.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      localStorage.setItem("TOKEN", payload.token);
      return {
        ...state,
        token: payload.token,
        info: {
          ...state.info,
          id: payload.uid,
          email: payload.email ?? "",
        },
        userLoading: false,
      };
    });
    builder.addCase(signUp.rejected, (state) => ({
      ...state,
      userLoading: true,
    }));
    //set info
    builder.addCase(setUserInfo.pending, (state) => ({
      ...state,
      userLoading: true,
    }));
    builder.addCase(setUserInfo.fulfilled, (state, { payload }) => ({
      ...state,
      info: {
        ...state.info,
        name: payload.name ?? "",
        cart_id: payload.cart_id ?? "",
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
      info: {
        ...state.info,
        name: payload.name ?? "",
        cart_id: payload.cart_id ?? "",
        role: payload.role ?? "CM",
      },
      userLoading: false,
    }));
    builder.addCase(getUserInfo.rejected, (state) => ({
      ...state,
      userLoading: false,
    }));
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
