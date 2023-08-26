import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].cartQuantity += 1;
        toast.info(`increase ${state.cartItems[productIndex].name} quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`added a new ${action.payload.name} to cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const newCart = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCart;
      toast.error(`${action.payload} removed from cart`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    clearCart(action, state) {
      state.cartItems = [];
      toast.error(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
