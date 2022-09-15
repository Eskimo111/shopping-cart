import axiosClient from "./axiosClient";

const productApi = {
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
};

export default productApi;
