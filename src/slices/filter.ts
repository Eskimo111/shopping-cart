import { createSlice } from "@reduxjs/toolkit";
import { Filter } from "../models/filter";

const initialState: Filter = {
  limit: 6,
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: () => ({ ...initialState }),

    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, { payload }) => ({
      ...state,
      category_slug: payload,
    }),
    setPrice: (state, action) => {
      if (state.price) {
        state.price = action.payload;
      }
    },
    setSortBy: (state, { payload }) => ({
      ...state,
      sortBy: payload.sortBy !== "" ? payload.sortBy : null,
      sortDirection:
        payload.sortDirection !== "" ? payload.sortDirection : null,
    }),
    setPage: (state, { payload }) => ({
      ...state,
      page: payload,
    }),
  },
  extraReducers: {},
});

export const {
  resetFilter,
  setCategory,
  setPrice,
  setQuery,
  setSortBy,
  setPage,
} = filterSlice.actions;

export default filterSlice.reducer;
