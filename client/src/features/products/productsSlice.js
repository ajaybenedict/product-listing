import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsFromAPI } from './productsAPI';

const initialState = {
  items: [],
  page: 1,
  hasMore: true,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page }) => {
    return await fetchProductsFromAPI(page);
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = [...state.items, ...action.payload];
        if (action.payload.length < 10) {
          state.hasMore = false;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { incrementPage } = productsSlice.actions;

// Selectors
export const selectItems = (state) => state.products.items;

export default productsSlice.reducer;