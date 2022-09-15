import React from "react";
import { Link } from "react-router-dom";

const SubNavBar = () => {
  return (
    <nav className="w-full text-black sm:px-4 py-4 flex justify-center dark:bg-gray-900">
      <div className="flex gap-4">
        <Link to="/shopping">Shop</Link>
        <Link to="/developer">For developer</Link>
      </div>
    </nav>
  );
};

export default SubNavBar;
