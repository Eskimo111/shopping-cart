import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartApi from "../../api/cartApi";
import { setCookie } from "../../app/cookie";
import { RootState } from "../../app/store";
import { Product } from "../shopping/shoppingSlice";

type Cart = {
    id:string,
    line_items:Product[];
    total_items:number,
    total_unique_items:number,
    subtotal:{
        raw:number,
        formatted: string,
    }
    currency:{
        code: string,
        symbol:string,
    }
}

const initialState:Cart[] = [];

export const loadCartById = createAsyncThunk("cart/load", 
async (id:string) => {
    try{
    const response = await cartApi.loadCart(id);
    return response;
    } catch (error){
        console.error();
    }
})

export const createCart = createAsyncThunk("cart/create", 
async () => {
    try{
    const response = await cartApi.createNewCart();
    return response;
    } catch (error){
        console.error();
    }
})

export const addToCart = createAsyncThunk("cart/addToCart", 
async (product:{id:string, quantity:number}, {dispatch, getState}) => {
    try{
    const {id} = (getState() as RootState).cart[0];
    const response = await cartApi.addToCart(product, id);
    return response;
    } catch (error){
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
        .addCase(createCart.fulfilled, (state,action) => {
            const {id,line_items, total_items,total_unique_items, subtotal,currency }:Cart = action.payload as any;
            state.push({id,line_items,total_items,total_unique_items, subtotal,currency });
            setCookie("cart_id", id, 30);
            console.log("create");
        })
        .addCase(loadCartById.fulfilled, (state, action) => {
            const {id,line_items,total_items,total_unique_items, subtotal,currency }:Cart = action.payload as any;
            state.push({id,line_items,total_items,total_unique_items, subtotal,currency });  
            console.log("load:"+total_items);
        })
    },
  });
  

export const {} = cartSlice.actions;


export default cartSlice.reducer;