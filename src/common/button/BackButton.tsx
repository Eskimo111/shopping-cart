import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="w-5/6 py-4 mx-auto flex items-center"
      onClick={() => navigate(-1)}
    >
      <BsArrowLeftShort />
      Back
    </button>
  );
};

export default BackButton;
