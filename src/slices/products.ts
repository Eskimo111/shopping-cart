import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../utils/customer_services/product.service";
import ownerProductApi from "../utils/owner_services/productApi";
import { setPagination } from "./pagination";
import { Filter } from "./filter";

export interface Variant {
  id: string;
  name: string;
  options: [
    {
      id: string;
      name: string;
    }
  ];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: {
    raw: number;
    formatted: string;
  };
  image: {
    id: string;
    url: string;
  };
  variant_groups: Variant[];
  categories: Category[];
}

const initialState: Product[] = [];

export const fetchAllProduct = createAsyncThunk(
  "products/getProduct",
  async () => {
    try {
      const response = await productApi.getAll();
      return response.data;
    } catch (error) {
      console.error();
    }
  }
);

export const fetchProductByPage = createAsyncThunk(
  "products/getProductByPage",
  async (input: { limit: number; page: number }, { dispatch }) => {
    try {
      const response = (await productApi.getByPage(input)) as any;
      //console.log(response.meta.pagination);
      dispatch(setPagination(response.meta.pagination));

      return response.data;
    } catch (error) {
      console.error();
    }
  }
);

export const fetchProductWithFilter = createAsyncThunk(
  "products/getProductWithFilter",
  async (input: Filter, { dispatch }) => {
    try {
      const response = (await productApi.getWithFilter(input)) as any;
      dispatch(setPagination(response.meta.pagination));
      return response.data;
    } catch (error) {
      console.error();
    }
  }
);

/*export const fetchProductSize = createAsyncThunk(
  "products/getProductSize",
  async (empty: string, { getState, dispatch }) => {
    const productList = (getState() as RootState).products;
    try {
      productList.forEach((element) => {
        //console.log(element.id);
        dispatch(fetchProductById(element.id));
      });
    } catch (error) {
      console.error();
    }
  }
);*/

export const fetchProductById = createAsyncThunk(
  "products/getProductById",
  async (product_id: string) => {
    try {
      //console.log(product_id);
      const response = await productApi.getById(product_id);
      //console.log(response);
      return response;
    } catch (error) {
      console.error();
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (input: {
    id: string;
    name: string;
    description: string;
    price: number;
    active: boolean;
  }) => {
    const productWithoutId: {
      name: string;
      description: string;
      price: number;
      active: boolean;
    } = input;
    const apiInput = {
      product: productWithoutId,
    };

    try {
      const response = await ownerProductApi.updateProduct(input.id, apiInput);
      //console.log(response);
      return response;
    } catch (error) {
      console.error();
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.length = 0;
        action.payload?.forEach((element: Product) => {
          state.push({ ...element, variant_groups: [] });
        });
      })
      .addCase(fetchProductByPage.fulfilled, (state, action) => {
        state.length = 0;
        action.payload?.forEach((element: Product) => {
          state.push({ ...element, variant_groups: [] });
        });
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const product = action.payload as any as Product;
        if (state.length !== 0) {
          state.forEach((element: Product, index) => {
            if (element.id === product.id) {
              if (product.variant_groups[0]) {
                state[index].variant_groups.length = 0;
                state[index].variant_groups.push(product.variant_groups[0]);
              }
            }
          });
        } else {
          state.push(product);
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const product = action.payload as any as Product;
        if (state.length !== 0) {
          state.forEach((element: Product, index) => {
            if (element.id === product.id) {
              state[index] = product;
            }
          });
        } else {
          state.push(product);
        }
      })
      .addCase(fetchProductWithFilter.fulfilled, (state, action) => {
        state.length = 0;
        action.payload?.forEach((element: Product) => {
          state.push({ ...element, variant_groups: [] });
        });
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
