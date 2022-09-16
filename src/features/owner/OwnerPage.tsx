import React from "react";
import { GiRunningShoe } from "react-icons/gi";
import { GrResources } from "react-icons/gr";
import { Link, Outlet } from "react-router-dom";

const OwnerPage = () => {
  return (
    <div className="container flex flex-wrap w-10/12 md:w-5/6 lg:w-5/6 m-auto p-8 gap-6 justify-center">
      <h2 className="w-full text-2xl text-center font-bold py-8">
        Owner feature
      </h2>
      <Link
        to="/owner/products"
        className="flex flex-col w-1/4 justify-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl shadow-md rounded-lg cursor-pointer "
      >
        <div className="p-16 flex justify-center items-center font-bold text-2xl bg-gray-800 text-white rounded-t-lg">
          <GiRunningShoe size={40} />
        </div>
        <div className="basis-11/12 flex flex-col py-3 px-4 text-black bg-white rounded-b-lg border border-bl">
          <h3 className="text-lg font-semibold "> Manage product</h3>
          <p className="text-sm">View, create, update and remove products</p>
        </div>
      </Link>
      <Link
        to="/owner/assets"
        className="flex flex-col w-1/4 justify-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl shadow-md rounded-lg cursor-pointer "
      >
        <div className="p-16 flex justify-center items-center font-bold text-2xl bg-gray-800 text-white rounded-t-lg">
          <GrResources id="asset-icon" size={40} />
        </div>
        <div className="basis-11/12 flex flex-col py-3 px-4 text-black bg-white rounded-b-lg border border-bl">
          <h3 className="text-lg font-semibold "> Manage Assets</h3>
          <p className="text-sm">
            View, create, update and remove assets like images, audio, text
          </p>
        </div>
      </Link>
    </div>
  );
};

export default OwnerPage;
