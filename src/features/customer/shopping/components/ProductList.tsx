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
  const pagination = useAppSelector((state: RootState) => state.pagination);
  const filter = useAppSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();
  const productList = useAppSelector((state: RootState) => state.products);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(filter);
    dispatch(fetchProductWithFilter(filter))
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
      ) : (
        productList.map((element) => (
          <ProductItem key={element.id} data={element}></ProductItem>
        ))
      )}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};

export default ProductList;
