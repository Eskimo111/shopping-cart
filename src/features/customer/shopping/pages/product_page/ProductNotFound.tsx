import React from "react";
import { GiRunningShoe } from "react-icons/gi";
import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <div className="w-1/2 mx-auto  text-center pt-32 flex flex-col justify-center items-center gap-4">
      <GiRunningShoe className="text-gray-600" size={100} />
      <p className="text-3xl font-semibold -mb-4">Product not found.</p>
      <p>The requested url was not found on this server</p>
      <Link className="btn-primary w-fit rounded-full py-3" to="/shopping">
        Go home
      </Link>
    </div>
  );
};

export default ProductNotFound;
