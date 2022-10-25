import React from "react";

const Message = (props: {
  message: string;
  type: "success" | "fail";
  showing: boolean;
}) => {
  return (
    <div
      className={`fixed top-16 left-1/2 -translate-x-1/2 ${
        props.type === "success"
          ? "border-green-400 text-green-700"
          : "border-red-400 text-red-700"
      } ${
        props.showing ? "show" : "render "
      } bg-white  px-4 py-4 border rounded-lg`}
    >
      {props.message}
    </div>
  );
};

export default Message;
