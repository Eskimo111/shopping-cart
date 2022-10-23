import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../../../hooks/use-app-selector";
import { resetFilter, setQuery } from "../../../../../slices/filter";
import { RootState } from "../../../../../store/store";
import ProductList from "../../components/ProductList";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  let searchString = searchParams.get("search");
  if (!searchString) searchString = "";
  dispatch(resetFilter());
  dispatch(setQuery(searchString));
  return (
    <div className="container mx-auto p-12 flex flex-wrap items-center font-inter">
      <h2 className="text-xl basis-full mb-8 text-center">
        Search result for "<i>{searchString}</i>"
      </h2>
      <ProductList />
    </div>
  );
};

export default SearchPage;
