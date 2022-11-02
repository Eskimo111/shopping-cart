import { FirebaseError } from "firebase/app";
import { signInWithCustomToken } from "firebase/auth";
import path, { resolve } from "path";
import { useCallback } from "react";
import { auth } from "../firebase";
import { createCartAsync, loadCartAsync } from "../slices/cart";
import {
  getUserInfo,
  logOut,
  setUserInfo,
  signIn,
  signInWithGoogle,
  signInWithToken,
  signUp,
} from "../slices/user";
import { getCookie } from "../store/cookie";
import { RootState } from "../store/store";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppSelector } from "./use-app-selector";

type UseAuth = {
  isAuthenticated: () => boolean;
  signin: (email: string, password: string, remember: boolean) => Promise<void>;
  signinWithToken: (token: string) => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermisssion: (url: string) => boolean;
};

const getStorage = (key: string): string =>
  (localStorage.getItem(key) || sessionStorage.getItem(key)) ?? "null";

const useAuth = (): UseAuth => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state: RootState) => state.user.info.role);
  const token = useAppSelector((state: RootState) => state.user.token);

  const isAuthenticated = useCallback((): boolean => {
    //const token = JSON.parse(getStorage("TOKEN"));
    if (token) return true;
    return false;
    //Dung token nay de lay thong tin nguoi dung vd: cart
  }, [dispatch]);

  const signin = async (
    email: string,
    password: string,
    remember: boolean
  ): Promise<void> => {
    await dispatch(signIn({ email: email, password: password }))
      .unwrap()
      .then((resolve) => {
        if (remember) {
          const tokenObject = { value: resolve.token, timeStamps: Date.now() };
          localStorage.setItem("TOKEN", JSON.stringify(tokenObject));
        }
        dispatch(getUserInfo())
          .unwrap()
          .then((resolve) => {
            return dispatch(loadCartAsync(resolve.cart_id!));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        throw error;
      });
  };

  const signinWithToken = async (token: string): Promise<void> => {
    await dispatch(signInWithToken(token))
      .unwrap()
      .then((resolve) => {
        console.log("success");
        dispatch(getUserInfo())
          .unwrap()
          .then((resolve) => {
            return dispatch(loadCartAsync(resolve.cart_id!));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        throw error;
      });
  };

  const signinWithGoogle = async (): Promise<void> => {
    await dispatch(signInWithGoogle())
      .unwrap()
      .then((resolve) => {
        dispatch(getUserInfo())
          .unwrap()
          .then((resolve) => {
            console.log("Sign in with Google: Get User Info Success");
            return dispatch(loadCartAsync(resolve.cart_id!));
          })
          .catch(() => {
            console.log(
              "Sign in with Google: Get User Info Fail, set userinfo instead"
            );
            dispatch(createCartAsync()).then(() =>
              dispatch(setUserInfo(resolve.displayName ?? "Anonymous"))
            );
          });
      })
      .catch((error) => {
        throw error;
      });
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    await dispatch(signUp({ email: email, password: password }))
      .unwrap()
      .then(() => {
        console.log("sign up success");
        dispatch(createCartAsync()).then(() => dispatch(setUserInfo(name)));
      })
      .catch((error: FirebaseError) => {
        throw error;
      });
  };
  const logout = async () => {
    await auth.signOut();
    dispatch(logOut());
    const cookieCart = getCookie("cart_id");
    localStorage.removeItem("TOKEN");
    if (cookieCart) dispatch(loadCartAsync(cookieCart));
  };

  const hasPermisssion = (url: string): boolean => {
    const pathname = url.split("/")[0];
    if (pathname === "owner" && role !== "AD") return false;
    return true;
  };
  return {
    isAuthenticated,
    signin,
    signinWithGoogle,
    signinWithToken,
    signup,
    logout,
    hasPermisssion,
  };
};

export default useAuth;
