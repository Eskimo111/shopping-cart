import { createSlice } from "@reduxjs/toolkit";

export interface Filter {
  query?: string | null;
  category_slug?: string | null;
  limit: number;
  page: number;
  price?: {
    above: number;
    below: number;
  } | null;
  sortBy?: string | null;
  sortDirection?: "asc" | "desc" | null;
}

const initialState: Filter = {
  limit: 6,
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: (state) => ({ ...initialState }),

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
      sortBy: payload.sortBy !== "" ? payload.sortBy : undefined,
      sortDirection:
        payload.sortDirection !== "" ? payload.sortDirection : undefined,
    }),
    setSortDirection: (state, { payload }) => ({
      ...state,
      sortDirection: payload,
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
  setSortDirection,
  setPage,
} = filterSlice.actions;

export default filterSlice.reducer;
