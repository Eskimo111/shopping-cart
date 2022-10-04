import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/user_api/productApi";
import ownerProductApi from "../../api/owner_api/productApi";
import { RootState } from "../../app/store";

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

const initialState: Pagination = {
  total: 0,
  count: 0,
  per_page: 6,
  current_page: 1,
  total_pages: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      const { total, count, per_page, current_page, total_pages } =
        action.payload as Pagination;
      return {
        ...state,
        total: total,
        count: count,
        per_page: per_page,
        current_page: current_page,
        total_pages: total_pages,
      };
    },
  },
});

export const { setPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
