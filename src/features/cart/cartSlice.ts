import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../../api/cartApi";
import { getCookie, setCookie } from "../../app/cookie";
import { Product } from "../shopping/shoppingSlice";

export interface CartItemType extends Product {
    quantity: number;
}

type Cart = {
    id: string,
    line_items: CartItemType[];
    total_items: number,
    total_unique_items: number,
    subtotal: {
        raw: number,
        formatted: string,
    }
    currency: {
        code: string,
        symbol: string,
    }
}

const initialState: Cart[] = [{
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
    }
}];

export const loadCart = createAsyncThunk("cart/load",
    async () => {
        try {
            const id = getCookie("cart_id")!;
            const response = await cartApi.loadCart(id);
            return response;
        } catch (error) {
            console.error();
        }
    })

export const createCart = createAsyncThunk("cart/create",
    async () => {
        try {
            const response = await cartApi.createNewCart();
            return response;
        } catch (error) {
            console.error();
        }
    })

export const addToCart = createAsyncThunk("cart/addToCart",
    async (product: { id: string, quantity: number }, { dispatch }) => {
        try {
            const id = getCookie("cart_id")!;
            const response = await cartApi.addToCart(product, id);
            //After add, reload cart so the navbar show number of item
            dispatch(loadCart());
            return response;
        } catch (error) {
            console.error();
        }
    })

export const removeFromCart = createAsyncThunk("cart/removeFromCart",
    async (id: string, { dispatch }) => {
        try {
            const cart_id = getCookie("cart_id")!;
            const response = await cartApi.removeFromCart(id, cart_id);
            //After add, reload cart so the navbar show number of item
            dispatch(loadCart());
            return response;
        } catch (error) {
            console.error();
        }
    })



export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCart.fulfilled, (state, action) => {
                const { id, line_items, total_items, total_unique_items, subtotal, currency }: Cart = action.payload as any;
                state.length = 0;
                state.push({ id, line_items, total_items, total_unique_items, subtotal, currency });
                setCookie("cart_id", id, 30);
                console.log("create");
            })
            .addCase(loadCart.fulfilled, (state, action) => {
                const { id, line_items, total_items, total_unique_items, subtotal, currency }: Cart = action.payload as any;
                state.length = 0;
                state.push({ id, line_items, total_items, total_unique_items, subtotal, currency });
                console.log("load:" + id);
            })
    },
});


export const { } = cartSlice.actions;


export default cartSlice.reducer;