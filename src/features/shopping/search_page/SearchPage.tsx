import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import ProductItem from "../ProductItem";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let searchString = searchParams.get("search");
  if (!searchString) searchString = "";
  const productList = useAppSelector((state: RootState) => state.shopping);
  const searchResult = productList.filter((product) =>
    product.name.toLowerCase().includes(searchString!.toLowerCase())
  );
  return (
    <div className="">
      <h2 className="text-xl font-bold mb-8 text-center">
        Search result for "{searchString}"
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {searchResult.map((element) => (
          <ProductItem data={element}></ProductItem>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
