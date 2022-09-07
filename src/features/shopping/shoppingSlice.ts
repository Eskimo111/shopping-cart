import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";


export interface Product {
    id: string,
    name:string,
    description: string,
    price:{
        raw: number,
        formatted: string,
    },
    image:{
        id:string,
        url:string,
    }
}

const initialState:Product[] = [];

export const fetchAllProduct = createAsyncThunk("shopping/getProduct", 
async () => {
    try{
    const response = await productApi.getAll();
    //console.log(response.data);
    return response.data;
    } catch (error){
        console.error();
    }
})

export const shoppingSlice = createSlice({
    name: "shopping",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.length = 0;
            action.payload.forEach((element:Product) => state.push(<Product>element));
        });
    },
  });
  

export const {} = shoppingSlice.actions;

export default shoppingSlice.reducer;