import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BackButton from "../../../components/button/BackButton";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import useAuth from "../../../hooks/use-auth";
import useMessage from "../../../hooks/use-message";
import { loadCartAsync } from "../../../slices/cart";
import { getUserInfo } from "../../../slices/user";
import { RootState } from "../../../store/store";

const logo = require("../../../asset/logo192.png");

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRememeber] = useState(false);
  const isLoading = useAppSelector(
    (state: RootState) => state.user.userLoading
  );
  const navigate = useNavigate();
  const message = useMessage();

  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    login(email, password, remember)
      .then(() => {
        setTimeout(() => navigate("/"), 0);
      })
      .catch(() => message.showMessage("Login fail. Try again!", "fail"));
    setEmail("");
    setPassword("");
    event.preventDefault();
  };

  return (
    <div className="m-auto flex justify-center flex-wrap w-5/6 md:w-1/2 lg:w-1/3 mt-20 p-8 gap-8">
      {message.node}
      <header className="flex flex-col justify-center items-center w-3/4 gap-4">
        <Link to="/">
          <img src={logo} className="w-16"></img>
        </Link>
        <div className="text-xl font-bold text-center">
          YOUR ACCOUNT FOR EVERYTHING NIKE
        </div>
      </header>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form
          className="flex flex-col items-center gap-4 w-3/4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="p-2 pl-4 w-full border border-gray-300 rounded-lg"
            type="text"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <input
            className="p-2 pl-4 w-full border border-gray-300 rounded-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <div className="flex w-full gap-2">
            <input
              id="remember"
              className=" text-black bg-gray-100 rounded-r-sm border-gray-300 focus:ring-gray-500 accent-gray-800"
              type="checkbox"
              name="remember"
              checked={remember}
              onChange={() => setRememeber(!remember)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button className="btn-primary w-full py-2 font-semibold">
            SIGN IN
          </button>

          <p className="text-gray-600">
            Not a Member?{" "}
            <Link className=" underline text-black" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
