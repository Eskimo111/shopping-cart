import axiosAdmin from "../axiosAdmin";

const productApi = {
  updateProduct: (id: string, input: any) => {
    const url = `/products/${id}`;
    console.log(id);
    console.log(input);
    return axiosAdmin.put(url, input);
  },
};

export default productApi;
