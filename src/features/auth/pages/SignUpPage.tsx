import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import useMessage from "../../../hooks/use-message";
import { logIn, setUserInfo, signUp } from "../../../slices/user";
import "./SignUp.less";
import { createCartAsync } from "../../../slices/cart";
import useAuth from "../../../hooks/use-auth";

const logo = require("../../../asset/logo192.png");

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 14,
    }}
    spin
  />
);

const SignUpPage = () => {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpw, setConfirmpw] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    comfirmpw: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmpw: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const message = useMessage();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case "name":
        setName(target.value);
        break;
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      case "comfirmpw":
        setConfirmpw(target.value);
        break;
    }
  };

  const handleBlur = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setTouched({ ...touched, [target.name]: true });
  };

  useEffect(() => {
    setErrors(validate(name, email, password, confirmpw));
  }, [touched, name, email, password, confirmpw]);

  const handleSubmit = (event: React.SyntheticEvent) => {
    setLoading(true);
    signup(email, password, name).finally(() => setLoading(false));
    event.preventDefault();
  };
  const validate = (
    name: string,
    email: string,
    password: string,
    confirmpw: string
  ) => {
    let errors = {
      name: "",
      email: "",
      password: "",
      confirmpw: "",
    };

    if (touched.name && name.length < 3)
      errors.name = "Name's length should be greater than 3 characters.";
    if (touched.email && !validateEmail(email))
      errors.email = "Please enter correct email format";
    if (touched.password && password.length < 3)
      errors.password =
        "Password's length should be greater than 3 characters.";
    if (touched.password && touched.comfirmpw && password !== confirmpw)
      errors.confirmpw = "Passwords don't match";
    return errors;
  };
  return (
    <div className="m-auto flex justify-center flex-wrap w-5/6 md:w-1/2 lg:w-1/3 mt-0 p-8 gap-8">
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
        <div className="input__container">
          <input
            className="border border-gray-300 rounded-lg"
            type="text"
            placeholder="Full name"
            name="name"
            value={name}
            onChange={(e) => handleInputChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
          <p>{errors.name}</p>
        </div>
        <div className="input__container">
          <input
            className="border border-gray-300 rounded-lg"
            type="text"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={(e) => handleInputChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
          <p>{errors.email}</p>
        </div>
        <div className="input__container">
          <input
            className="border border-gray-300 rounded-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
          <p>{errors.password}</p>
        </div>
        <div className="input__container">
          <input
            className="border border-gray-300 rounded-lg"
            type="password"
            placeholder="Confirm Password"
            name="comfirmpw"
            value={confirmpw}
            onChange={(e) => handleInputChange(e)}
            onBlur={(e) => handleBlur(e)}
            required
          />
          <p>{errors.confirmpw}</p>
        </div>
        <button
          className="btn-primary w-full py-2 font-semibold"
          disabled={Boolean(
            errors.name.length ||
              errors.email.length ||
              errors.password.length ||
              errors.confirmpw.length
          )}
        >
          {loading ? "..." : "SIGN UP"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
