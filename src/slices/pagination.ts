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
