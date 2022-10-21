import axiosAdmin from "../axiosAdmin";
import queryString from "query-string";

const productApi = {
  updateProduct: (id: string, input: any) => {
    const url = `/products/${id}`;
    return axiosAdmin.put(url, input);
  },
  getById: (product_id: string) => {
    const url = `/products/${product_id}`;
    return axiosAdmin.get(url);
  },
  getWithFilter: (input: any) => {
    const query = queryString.stringify(input);
    const url = `/products?${query}`;
    return axiosAdmin.get(url);
  },
};

export default productApi;
