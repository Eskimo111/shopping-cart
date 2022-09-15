import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";
import { RootState } from "../../app/store";

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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    raw: number;
    formatted: string;
  };
  image: {
    id: string;
    url: string;
  };
  variant_groups: Variant[];
}

const initialState: Product[] = [];

export const fetchAllProduct = createAsyncThunk(
  "shopping/getProduct",
  async () => {
    try {
      const response = await productApi.getAll();
      return response.data;
    } catch (error) {
      console.error();
    }
  }
);

export const fetchProductSize = createAsyncThunk(
  "shopping/getProductSize",
  async (empty: string, { getState, dispatch }) => {
    const productList = (getState() as RootState).shopping;
    try {
      productList.map((element: Product) => {
        //console.log(element.id);
        dispatch(fetchProductById(element.id));
      });
    } catch (error) {
      console.error();
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "shopping/getProductById",
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

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.length = 0;
        action.payload?.forEach((element: Product) => {
          state.push({ ...element, variant_groups: [] });
        });
        console.log("Fetch all product!");
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const product = <Product>(action.payload as any);
        if (state.length != 0) {
          state.map((element: Product, index) => {
            if (element.id === product.id) {
              if (product.variant_groups[0])
                state[index].variant_groups.push(product.variant_groups[0]);
            }
          });
        } else {
          state.push(product);
        }
      });
  },
});

export const {} = shoppingSlice.actions;

export default shoppingSlice.reducer;
