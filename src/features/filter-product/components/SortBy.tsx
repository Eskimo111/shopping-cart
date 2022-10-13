import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { BiChevronDown } from "react-icons/bi";
import "./SortBy.less";
import { useAppDispatch } from "../../../app/hooks";
import { setPage, setSortBy, setSortDirection } from "../../../slices/filter";

const { Option } = Select;

const SortBy = () => {
  const dispatch = useAppDispatch();
  const [direction, setDirection] = useState("");
  const [sortField, setSortField] = useState("");

  useEffect(() => {
    if (sortField !== "") {
      dispatch(setPage(1));
      dispatch(setSortBy({ sortBy: sortField, sortDirection: direction }));
    }
  }, [direction, sortField]);

  const handleChange = (value: string) => {
    if (!value) {
      setSortField("");
      setDirection("");
    }
    setSortField(value.split("_")[0]);
    setDirection(value.split("_")[1]);
  };

  const handleClear = () => {
    dispatch(setSortBy({ sortBy: undefined, sortDirection: undefined }));
  };

  return (
    <Select
      className="sort-by"
      suffixIcon={<BiChevronDown size={24} />}
      onChange={handleChange}
      allowClear
      placeholder="Sort by"
      bordered={false}
      onClear={handleClear}
    >
      <Option value="price_asc">Price: Low-High</Option>
      <Option value="price_desc">Price: High-Low</Option>
    </Select>
  );
};

export default SortBy;
