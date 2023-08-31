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
        toast.success(`a new ${action.payload.name} added to cart`, {
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
      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const decreasedCart = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[decreasedCart].cartQuantity > 1) {
        state.cartItems[decreasedCart].cartQuantity -= 1;
        toast.info(`${action.payload.name} decreased by 1`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[decreasedCart].cartQuantity === 1) {
        const newCart = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCart;
        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },

    clearCart(state, action) {
      state.cartItems = [];
      toast.info(`Cart cleared`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItem", JSON.stringify([]));
    },

    getTotal(state, action) {
      const { cartItems } = state;

      const { total, quantity } = cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
