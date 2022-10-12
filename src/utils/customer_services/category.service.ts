import axiosClient from "../axiosClient";

const categoryService = {
  getCategories: () => {
    const url = "/categories";
    return axiosClient.get(url);
  },
};

export default categoryService;
