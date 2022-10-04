import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../../api/user_api/cartApi";

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

type Cart = {
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
};

const initialState: Cart[] = [
  {
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
  },
];

export const loadCartAsync = createAsyncThunk("cart/load", async () => {
  try {
    const id = getCookie("cart_id")!;
    const response = await cartApi.loadCart(id);
    //dispatch(loadCart(response));
    return response;
  } catch (error) {
    console.error();
  }
});

export const createCartAsync = createAsyncThunk("cart/create", async () => {
  try {
    const response = await cartApi.createNewCart();
    return response;
  } catch (error) {
    console.error();
  }
});

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
      console.log(formattedInput);
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state[0].line_items.map((product, index) => {
        if (product.id === action.payload?.id) {
          state[0].line_items[index].quantity += action.payload?.quantity;
        }
      });
    },
    loadCart: (state, action) => {
      const {
        id,
        line_items,
        total_items,
        total_unique_items,
        subtotal,
        currency,
      }: Cart = action.payload as any;
      state.length = 0;
      state.push({
        id,
        line_items,
        total_items,
        total_unique_items,
        subtotal,
        currency,
      });
      console.log("load:" + id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartAsync.fulfilled, (state, action) => {
        const {
          id,
          line_items,
          total_items,
          total_unique_items,
          subtotal,
          currency,
        }: Cart = action.payload as any;
        state.length = 0;
        state.push({
          id,
          line_items,
          total_items,
          total_unique_items,
          subtotal,
          currency,
        });
        setCookie("cart_id", id, 30);
        console.log("create new cart");
      })
      .addCase(loadCartAsync.fulfilled, (state, action) => {
        const {
          id,
          line_items,
          total_items,
          total_unique_items,
          subtotal,
          currency,
        }: Cart = action.payload as any;
        state.length = 0;
        state.push({
          id,
          line_items,
          total_items,
          total_unique_items,
          subtotal,
          currency,
        });
        console.log("load cookie cart: " + id);
      });
  },
});

export const { addToCart, loadCart } = cartSlice.actions;

export default cartSlice.reducer;
