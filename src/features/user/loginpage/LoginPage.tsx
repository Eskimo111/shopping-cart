import React, { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { sendMagicEmail } from "../userSlice";

const logo = require("../../../asset/logo192.png");

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setEmail(target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    dispatch(sendMagicEmail(email));
    event.preventDefault();
  };
  return (
    <div className="m-auto flex justify-center flex-wrap w-5/6 md:w-1/2 lg:w-1/3 mt-20 p-8 gap-8">
      <header className="flex flex-col justify-center items-center w-3/4 gap-4">
        <img src={logo} className="w-16"></img>
        <div className="text-xl font-bold text-center">
          YOUR ACCOUNT FOR EVERYTHING NIKE
        </div>
      </header>
      <div className="w-full text-center rounded-lg bg-gray-300 border border-black p-3">
        If email address exists in our system, we'll send you a link to continue
        logging in!
      </div>
      <form
        className="flex flex-col items-center gap-4 w-3/4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="p-2 pl-4 w-full border border-gray-300 rounded-lg"
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => handleInputChange(e)}
        />
        <button className="btn-primary w-full py-2">Send magic link</button>
      </form>
    </div>
  );
};

export default LoginPage;
