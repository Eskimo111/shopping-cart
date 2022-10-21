import { RootState } from "../../../store/store";
import BackButton from "../../../components/button/BackButton";
import OwnerProductItem from "./components/OwnerProductItem";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { useEffect, useState } from "react";
import { resetFilter, setPage } from "../../../slices/filter";
import { ownerFetchProductWithFilter } from "../../../slices/products";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import LoadingSpinner from "../../../components/loading-spinner/LoadingSpinner";
import ProductPagination from "../../customer/pagination/Pagination";

const ManageProductPage = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const productList = useAppSelector((state: RootState) => state.products);
  const filter = useAppSelector((state: RootState) => state.filter);
  const pagination = useAppSelector((state: RootState) => state.pagination);

  // reset filter when first render component
  useEffect(() => {
    console.log("resetFilter");
    dispatch(resetFilter());
  }, []);

  // fetch product whenever filter change
  useEffect(() => {
    setLoading(true);
    dispatch(ownerFetchProductWithFilter())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((reject) => {
        console.log(reject);
      });
  }, [filter]);
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-12 flex flex-col flex-wrap items-center pt-8">
          <BackButton />
          <h2 className="basis-full px-4 py-2 text-xl font-medium">
            All product
          </h2>

          <div className="w-full lg:w-5/6">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-center">Id</th>
                    <th className="py-3 px-6 text-center">Name</th>
                    <th className="py-3 px-6 text-center">Price</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800 text-sm font-light">
                  {productList.map((product, index) => (
                    <OwnerProductItem data={product} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ProductPagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ManageProductPage;
