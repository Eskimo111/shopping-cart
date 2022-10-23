import { useEffect, useState } from "react";
import { RootState } from "../../../../store/store";
import ProductItem from "./ProductItem";
import Pagination from "../../pagination/Pagination";
import { fetchProductWithFilter } from "../../../../slices/products";
import LoadingSpinner from "../../../../components/loading-spinner/LoadingSpinner";
import { setPage } from "../../../../slices/filter";
import SortBy from "../../filter-product/components/SortBy";
import { useAppSelector } from "../../../../hooks/use-app-selector";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state: RootState) => state.pagination);
  const filter = useAppSelector((state: RootState) => state.filter);
  const productList = useAppSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProductWithFilter())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [filter]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };
  return (
    <div className="basis-3/4 mx-auto px-12 flex flex-wrap items-center py-8">
      <div className="w-full flex justify-between">
        <h2 className=" px-4 py-2 text-xl font-medium">STORE</h2>
        <SortBy />
      </div>
      {loading ? (
        <div className="relative h-72 w-full">
          <LoadingSpinner />
        </div>
      ) : productList.length !== 0 ? (
        productList.map((element) => (
          <ProductItem key={element.id} data={element}></ProductItem>
        ))
      ) : (
        <p className="w-full text-center text-xl py-4">
          There are no matching products!
        </p>
      )}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProductList;
