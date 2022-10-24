import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../utils/customer_services/product.service";
import ownerProductApi from "../utils/owner_services/product.service";
import { setPagination } from "./pagination";
import { Product } from "../models/product";
import { RootState } from "../store/store";

const initialState: Product[] = [];

export const fetchAllProduct = createAsyncThunk(
  "products/getProduct",
  async (): Promise<Product[]> => {
    const response = await productApi.getAll();
    return response.data as any as Product[];
  }
);

export const fetchProductByPage = createAsyncThunk(
  "products/getProductByPage",
  async (
    input: { limit: number; page: number },
    { dispatch }
  ): Promise<Product[]> => {
    const response = (await productApi.getByPage(input)) as any;
    //console.log(response.meta.pagination);
    dispatch(setPagination(response.meta.pagination));
    return response.data as Product[];
  }
);

export const fetchProductWithFilter = createAsyncThunk(
  "products/getProductWithFilter",
  async (no_arg, { dispatch, getState }): Promise<Product[]> => {
    const filter = (getState() as RootState).filter;
    const response = (await productApi.getWithFilter(filter)) as any;
    dispatch(setPagination(response.meta.pagination));
    if (!response.data) return [];
    return response.data as Product[];
  }
);

export const fetchProductById = async (
  product_id: string
): Promise<Product> => {
  const response = await productApi.getById(product_id);
  return response as any as Product;
};
/* --------------------- OWNER FEATURE --------------------- */
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (input: {
    id: string;
    name: string;
    description: string;
    price: number;
    active: boolean;
  }) => {
    const { name, description, price, active } = input;
    const response = await ownerProductApi.updateProduct(input.id, {
      product: {
        name: name,
        description: description,
        price: price,
        active: active,
      },
    });
    //console.log(response);
    return response;
  }
);

export const ownerFetchProductWithFilter = createAsyncThunk(
  "products/ownergetProductWithFilter",
  async (no_arg, { dispatch, getState }) => {
    const filter = (getState() as RootState).filter;
    const response = (await ownerProductApi.getWithFilter(filter)) as any;
    dispatch(setPagination(response.meta.pagination));
    return response.data as Product[];
  }
);

export const ownerFetchProductById = async (
  product_id: string
): Promise<Product> => {
  const response = await ownerProductApi.getById(product_id);
  return response as any as Product;
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.fulfilled, (state, { payload }) => payload)
      .addCase(fetchProductByPage.fulfilled, (state, { payload }) => payload)
      .addCase(
        fetchProductWithFilter.fulfilled,
        (state, { payload }) => payload
      )
      .addCase(
        ownerFetchProductWithFilter.fulfilled,
        (state, { payload }) => payload
      );
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
