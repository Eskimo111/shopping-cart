import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Banner from "../../common/banner/Banner";
import Filter from "../filter-product";
import { resetFilter, setPage } from "../../slices/filter";

import ProductList from "./components/ProductList";

const Shopping = () => {
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

export default Shopping;
