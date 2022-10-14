import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 44,
    }}
    spin
  />
);

const LoadingSpinner = () => {
  return (
    <Spin
      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      delay={200}
      indicator={antIcon}
      style={{ color: "black" }}
    ></Spin>
  );
};

export default LoadingSpinner;
