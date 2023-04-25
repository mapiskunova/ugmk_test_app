import { createSlice } from "@reduxjs/toolkit";
import { createSagaAction } from "saga-toolkit";

export const getProducts = createSagaAction('products/getProducts');

const products = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    fetchData: (state, action) => {
      state.products = action.payload;
    }
  },
});

export const { fetchData } = products.actions;

export default products.reducer;