import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BackButton from "../../../components/button/BackButton";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import useMessage from "../../../hooks/use-message";
import { login } from "../../../slices/user";

const logo = require("../../../asset/logo192.png");

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
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
    dispatch(login({ email: email, password: password }))
      .unwrap()
      .then(() => {
        setTimeout(() => navigate("/"), 1000);
        message.showMessage(`Login success`, "success");
      })
      .catch(() => {
        message.showMessage(
          "Error. Can't send email, please try again",
          "failed"
        );
      });
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
      {/*<div className="w-full text-center rounded-lg bg-gray-300 border border-black p-3">
        If email address exists in our system, we'll send you a link to continue
        logging in!
      </div>*/}
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
    </div>
  );
};

export default LoginPage;
