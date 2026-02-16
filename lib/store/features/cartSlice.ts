import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { dbApi } from '@/lib/api/dbApi';
import { CartItem, CartState } from '@/types/cart';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (uid: string) => {
    return await dbApi.getCart(uid);
  }
);

export const syncCart = createAsyncThunk(
  'cart/syncCart',
  async ({ uid, items }: { uid: string, items: CartItem[] }) => {
    await dbApi.saveCart(uid, items);
  }
);

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  isSynced: false,
};

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = calculateTotal(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalAmount = calculateTotal(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        state.totalAmount = calculateTotal(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.isSynced = false;
    },

    initializeCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.totalAmount = calculateTotal(state.items);
    }
  },
  
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.items = action.payload;
      state.totalAmount = calculateTotal(state.items);
      state.isSynced = true;
    });
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;