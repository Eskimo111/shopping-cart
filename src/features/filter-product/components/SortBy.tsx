import React from "react";
import { Select } from "antd";
import { BiChevronDown } from "react-icons/bi";
import "./SortBy.less";

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const SortBy = () => {
  return (
    <Select
      className="sort-by"
      suffixIcon={<BiChevronDown size={24} />}
      onChange={handleChange}
      allowClear
      placeholder="Sort by"
      bordered={false}
    >
      <Option value="priceasc">Price: Low-High</Option>
      <Option value="pricedesc">Price: High-Low</Option>
    </Select>
  );
};

export default SortBy;
