import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import cartApi from "../../utils/customer_services/cart.service";

import { getCookie, setCookie } from "../../app/cookie";
import { Product } from "../shopping/productsSlice";

export interface CartItemType extends Product {
  id: string;
  product_id: string;
  name: string;
  quantity: number;
  price: {
    raw: number;
    formatted: string;
  };
  line_total: { raw: number; formatted: string };
  selected_options: [{ group_name: string; option_name: string }];
}

export interface Cart {
  id: string;
  line_items: CartItemType[];
  total_items: number;
  total_unique_items: number;
  subtotal: {
    raw: number;
    formatted: string;
  };
  currency: {
    code: string;
    symbol: string;
  };
}

const initialState: Cart = {
  id: "",
  line_items: [],
  total_items: 0,
  total_unique_items: 0,
  subtotal: {
    raw: 0,
    formatted: "",
  },
  currency: {
    code: "",
    symbol: "",
  },
};
export const loadCartAsync = createAsyncThunk(
  "cart/load",
  async (): Promise<Cart> => {
    const id = getCookie("cart_id")!;
    const response = await cartApi.loadCart(id);
    return response as any as Cart;
  }
);

export const createCartAsync = createAsyncThunk(
  "cart/create",
  async (): Promise<Cart> => {
    const response = await cartApi.createNewCart();
    return response as any as Cart;
  }
);

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (
    input: {
      id: string;
      quantity: number;
      variant_id: string;
      option_id: string;
    },
    { dispatch }
  ) => {
    try {
      const id = getCookie("cart_id")!;
      const formattedInput = {
        id: input.id,
        quantity: input.quantity,
        options: { [input.variant_id]: input.option_id },
      };
      const response = await cartApi.addToCart(formattedInput, id);
      dispatch(loadCart(response));
      return response;
    } catch (error) {
      console.error();
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string, { dispatch }) => {
    try {
      const cart_id = getCookie("cart_id")!;
      const response = await cartApi.removeFromCart(id, cart_id);
      //After remove, reload cart so the navbar show number of item
      dispatch(loadCart(response));
      return response;
    } catch (error) {
      console.error();
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (input: { line_id: string; quantity: number }, { dispatch }) => {
    try {
      const cart_id = getCookie("cart_id")!;
      const response = await cartApi.updateCart(
        input.line_id,
        input.quantity,
        cart_id
      );
      //After remove, reload cart so the navbar show number of item
      dispatch(loadCart(response));
      return response;
    } catch (error) {
      console.error();
    }
  }
);
type CR<T> = CaseReducer<Cart, PayloadAction<T>>;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }): Cart => ({
      ...state,
      line_items: state.line_items.map((product) =>
        product.id === payload.id
          ? {
              ...product,
              quantity: product.quantity + payload.quantity,
            }
          : product
      ),
    }),
    loadCart: (state, action): Cart => ({
      ...action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartAsync.fulfilled, (state, { payload }) => {
        const { id } = payload;
        setCookie("cart_id", id, 30);
        console.log("create new cart");
        return { ...payload };
      })
      .addCase(loadCartAsync.fulfilled, (state, { payload }) => {
        const { id } = payload;
        console.log("load cookie cart: " + id);
        return { ...payload };
      });
  },
});

export const { addToCart, loadCart } = cartSlice.actions;

export default cartSlice.reducer;
