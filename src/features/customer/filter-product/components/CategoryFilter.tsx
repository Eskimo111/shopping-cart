import { Checkbox, Radio, RadioChangeEvent } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React, { useEffect } from "react";
import { useState } from "react";
import categoryApi from "../../../../utils/customer_services/category.service";
import { RootState } from "../../../../store/store";
import { setCategory, setPage } from "../../../../slices/filter";
import { useAppDispatch } from "../../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../../hooks/use-app-selector";
import useMediaQuery from "../../../../hooks/use-media-query";

const fetchCategories = async () => {
  const response = await categoryApi.getCategories();
  return response.data;
};

const CategoryFilter = () => {
  const isBigDevice = useMediaQuery();
  const dispatch = useAppDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const options = [] as any;
  categoryList.forEach((category: any) => {
    options.push({ label: category.name, value: category.slug });
  });
  useEffect(() => {
    fetchCategories()
      .then((result) => {
        setCategoryList(result as any);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(setPage(1));
    dispatch(setCategory(value));
  };

  return (
    <div className="md:w-full px-2 md:px-4 py-2 flex md:flex-col gap-2 font-inter">
      {isBigDevice ? (
        <>
          <p className="font-semibold text-lg">Categories</p>
          <hr className="w-20 bg-gray-400 -mt-2 ml-2 h-0.25"></hr>
        </>
      ) : (
        <p className="w-fit bg-gray-200 rounded-full p-2 px-3 font-semibold text-md cursor-pointer">
          Categories
        </p>
      )}

      {isBigDevice && (
        <Radio.Group
          name="category"
          options={options}
          onChange={onChange}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        ></Radio.Group>
      )}
    </div>
  );
};

export default CategoryFilter;
