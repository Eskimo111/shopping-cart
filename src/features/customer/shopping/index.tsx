import React, { useEffect } from "react";
import Banner from "../../../components/banner/Banner";
import Filter from "../filter-product";
import { resetFilter } from "../../../slices/filter";

import ProductList from "./components/ProductList";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";

const ShoppingPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("resetFilter");
    dispatch(resetFilter());
  }, []);
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

export default ShoppingPage;
