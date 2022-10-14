import React from "react";
import CategoryFilter from "./components/CategoryFilter";

const Filter = () => {
  return (
    <div className="basis-1/4 px-12 flex flex-wrap flex-col py-8">
      <h2 className="w-full px-4 py-2 text-xl font-medium">FILTER</h2>
      <CategoryFilter />
    </div>
  );
};

export default Filter;
