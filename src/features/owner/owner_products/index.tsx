import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import BackButton from "../../../common/button/BackButton";
import { fetchProductById } from "../../../slices/products";
import OwnerProductItem from "./components/OwnerProductItem";

const ManageProductPage = () => {
  const productList = useAppSelector((state: RootState) => state.products);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto px-12 flex flex-col flex-wrap items-center pt-8">
      <BackButton />
      <h2 className="basis-full px-4 py-2 text-xl font-medium">All product</h2>

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
    </div>
  );
};

export default ManageProductPage;
