import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Filter {
  query: string | undefined;
  category_slug: string | string[] | undefined;
  limit: number;
  page: number;
  price:
    | {
        above: number;
        below: number;
      }
    | undefined;
  sortBy: string | undefined;
  sortDirection: "asc" | "desc" | undefined;
}

const initialState = {
  query: undefined,
  category_slug: undefined,
  limit: 6,
  page: 1,
  price: undefined,
  sortBy: undefined,
  sortDirection: undefined,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: (state) => {
      state = { ...initialState };
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category_slug = action.payload;
    },
    setPrice: (state, action) => {
      if (state.price) {
        state.price = action.payload;
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortDirection: (state, action) => {
      state.sortDirection = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  resetFilter,
  setCategory,
  setPrice,
  setQuery,
  setSortBy,
  setSortDirection,
  setPage,
} = filterSlice.actions;

export default filterSlice.reducer;
