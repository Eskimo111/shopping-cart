import React, { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import { HiOutlineFilter } from "react-icons/hi";
import useMediaQuery from "../../../hooks/use-media-query";

const Filter = () => {
  const isSmallDevice = useMediaQuery();

  return (
    <div className="w-full md:basis-1/4 px-12 flex flex-wrap md:flex-col pt-8 md:pb-8">
      {isSmallDevice ? (
        <h2 className="w-full px-4 py-2 text-xl font-medium">FILTER</h2>
      ) : (
        <div className="pl-4 py-2">
          <HiOutlineFilter size={26}></HiOutlineFilter>
        </div>
      )}
      <CategoryFilter />
    </div>
  );
};

export default Filter;
