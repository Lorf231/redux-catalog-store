import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchTerm: string;
  categoryId: number | null;
  minPrice: number;
  maxPrice: number;
}

const initialState: FilterState = {
  searchTerm: '',
  categoryId: null,
  minPrice: 0,
  maxPrice: 1000,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<number | null>) => {
      state.categoryId = state.categoryId === action.payload ? null : action.payload;
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.categoryId = null;
      state.minPrice = 0;
      state.maxPrice = 1000;
    },
  },
});

export const { setSearchTerm, setCategory, setPriceRange, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;