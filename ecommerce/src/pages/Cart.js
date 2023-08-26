import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import CartItem from "../components/CartItem";
import styles from "./Cart.module.css";
import { clearCart } from "../features/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is currently empty</p>
          <Link to="/products" className={styles.shopping}>
            <BsCartPlusFill />
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.cart}>
            <div>
              {cart.cartItems?.map((cartItem) => (
                <CartItem key={cartItem.id} data={cartItem} />
              ))}
            </div>
          </div>
          <div>
            <div className={styles.cartSummery}>
              <div className={styles.sum}>
                <span>Subtotal</span>
                <span className={styles.price}>${cart.cartTotalAmount}</span>
              </div>

              <p>Texas and Shipping calculated at Checkout</p>
              <button className={styles.checkout}>Checkout</button>
              <button
                className={styles.clearCart}
                onClick={() => handleClearCart}
              >
                Clear Cart
              </button>

              <div>
                <Link to="/products" className={styles.shopping}>
                  <BsCartPlusFill />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
