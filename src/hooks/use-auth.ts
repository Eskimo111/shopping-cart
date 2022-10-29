import path, { resolve } from "path";
import { useCallback } from "react";
import { auth } from "../firebase";
import { createCartAsync, loadCartAsync } from "../slices/cart";
import {
  getUserInfo,
  logIn,
  logOut,
  setUserInfo,
  signUp,
} from "../slices/user";
import { getCookie } from "../store/cookie";
import { RootState } from "../store/store";
import { useAppDispatch } from "./use-app-dispatch";
import { useAppSelector } from "./use-app-selector";

type UseAuth = {
  isAuthenticated: () => boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  hasPermisssion: (url: string) => boolean;
};

const getStorage = (key: string): string =>
  (localStorage.getItem(key) || sessionStorage.getItem(key)) ?? "null";

const useAuth = (): UseAuth => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state: RootState) => state.user.info.role);
  const isAuthenticated = useCallback((): boolean => {
    const token = JSON.parse(getStorage("TOKEN"));
    if (token) return true;
    return false;
    //Dung token nay de lay thong tin nguoi dung vd: cart
  }, [dispatch]);
  const login = async (
    email: string,
    password: string,
    remember: boolean
  ): Promise<void> => {
    await dispatch(logIn({ email: email, password: password }));
    /*if (remember) {
      localStorage.setItem("EMAIL", email);
      localStorage.setItem("PASSWORD", password);
    }*/

    dispatch(getUserInfo())
      .then((resolve) => {
        return dispatch(loadCartAsync(resolve.payload.cart_id));
      })
      .catch((error) => console.log(error));
  };
  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<void> => {
    await dispatch(signUp({ email: email, password: password }));
    dispatch(createCartAsync()).then(() => dispatch(setUserInfo(name)));
  };
  const logout = () => {
    auth.signOut();
    dispatch(logOut());
    const cookieCart = getCookie("cart_id");
    if (cookieCart) dispatch(loadCartAsync(cookieCart));
  };

  const hasPermisssion = (url: string): boolean => {
    const pathname = url.split("/")[0];
    if (pathname === "owner" && role !== "AD") return false;
    return true;
  };
  return { isAuthenticated, login, signup, logout, hasPermisssion };
};

export default useAuth;
