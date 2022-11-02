import React from "react";
import { IoMdConstruct } from "react-icons/io";
import { Link } from "react-router-dom";

const RestrictedPage = () => {
  return (
    <div className="w-1/2 mx-auto  text-center pt-32 flex flex-col justify-center items-center gap-4">
      <IoMdConstruct className="text-gray-600" size={100} />
      <p className=" text-xl font-semibold">
        Sorry, this feature is for owner only.
      </p>

      <Link className="btn-primary w-fit rounded-full py-2" to="/shopping">
        Go home
      </Link>
    </div>
  );
};

export default RestrictedPage;
