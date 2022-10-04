import React from "react";
import Banner from "../../common/banner/Banner";
import Filter from "../filter-product";

import ProductList from "./components/ProductList";

const Shopping = () => {
  return (
    <>
      <Banner />
      <div className="container flex">
        <Filter />
        <ProductList />
      </div>
    </>
  );
};

export default Shopping;
