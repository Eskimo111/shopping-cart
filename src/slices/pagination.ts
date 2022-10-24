import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "../models/pagination";

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
    setPagination: (state, { payload }) => payload,
  },
});

export const { setPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
