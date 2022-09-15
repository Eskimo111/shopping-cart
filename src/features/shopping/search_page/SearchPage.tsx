import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import ProductItem from "../ProductItem";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  let searchString = searchParams.get("search");
  if (!searchString) searchString = "";
  const productList = useAppSelector((state: RootState) => state.shopping);
  const searchResult = productList.filter((product) =>
    product.name.toLowerCase().includes(searchString!.toLowerCase())
  );
  return (
    <div className="container mx-auto p-12 flex flex-wrap items-center font-inter">
      <h2 className="text-xl basis-full mb-8 text-center">
        Search result for "<i>{searchString}</i>"
      </h2>
      <div className="flex flex-wrap items-center">
        {searchResult.map((element) => (
          <ProductItem data={element}></ProductItem>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
