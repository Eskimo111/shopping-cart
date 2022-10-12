import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React, { useEffect } from "react";
import { useState } from "react";
import categoryApi from "../../../utils/customer_services/category.service";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { setCategory } from "../filterSlice";

const fetchCategories = async () => {
  const response = await categoryApi.getCategories();
  return response.data;
};

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state: RootState) => state.filter);
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
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
    dispatch(setCategory(checkedValues));
  };

  return (
    <div className="w-full px-4 py-2 flex flex-col gap-2 font-inter">
      <h3 className="font-light text-lg italic">Categories</h3>
      <Checkbox.Group
        name="category"
        options={options}
        onChange={onChange}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      ></Checkbox.Group>
    </div>
  );
};

export default CategoryFilter;
