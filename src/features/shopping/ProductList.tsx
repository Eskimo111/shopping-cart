import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ProductItem from "../shopping/ProductItem";

const ProductList = () => {
  const productList = useAppSelector((state: RootState) => state.shopping);

  return (
    <div className="container mx-auto px-12 flex flex-wrap items-center pt-8">
      <h2 className="basis-full px-4 py-2 text-xl font-medium">STORE</h2>
      {productList.map((element) => (
        <ProductItem data={element}></ProductItem>
      ))}
    </div>
  );
};

export default ProductList;
