import { createSlice } from '@reduxjs/toolkit'
import IShoppingItems from './types/IShoppingItems'
interface ShopingState {
  cart: IShoppingItems[];
}
const initialState: ShopingState = {
  cart: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
      try {
        const itemPresent: any = state.cart.find(
          (item) => item._id === action.payload._id
        );
        itemPresent.quantity++;
      } catch (e) {

      }

    },
    decrementQuantity: (state, action) => {
      try {
        const item: any = state.cart.find((item) => item._id === action.payload._id);
        if (item.quantity === 1) {
          const removeItem = state.cart.filter(
            (item) => item._id !== action.payload._id
          );
          state.cart = removeItem;
        } else {
          item.quantity--;
        }
      } catch (e) {

      }

    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
})
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = basketSlice.actions;
export default basketSlice.reducer;
