import React, { useEffect } from "react";
import Banner from "../../../components/banner/Banner";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { resetFilter } from "../../../slices/filter";
import Filter from "../filter-product";
import ProductList from "./components/ProductList";

const ShoppingPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("resetFilter");
    dispatch(resetFilter());
  }, []);
  return (
    <>
      <Banner />
      <div className="container flex flex-wrap">
        <Filter />
        <ProductList />
      </div>
    </>
  );
};

export default ShoppingPage;
