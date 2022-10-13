import axiosClient from "../axiosClient";
import queryString from "query-string";

const productService = {
  getAll: () => {
    const url = "/products";
    return axiosClient.get(url);
  },
  getSize: (product_id: string) => {
    const url = `/products/${product_id}/variant_groups`;
    return axiosClient.get(url);
  },
  getById: (product_id: string) => {
    const url = `/products/${product_id}`;
    return axiosClient.get(url);
  },
  getByPage: (input: { limit: number; page: number }) => {
    const query = queryString.stringify(input);
    const url = `/products?${query}`;
    return axiosClient.get(url);
  },
  getWithFilter: (input: any) => {
    const query = queryString.stringify(input);
    console.log(query);
    const url = `/products?${query}`;
    return axiosClient.get(url);
  },
};

export default productService;
