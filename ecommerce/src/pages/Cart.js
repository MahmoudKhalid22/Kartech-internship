import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import CartItem from "../components/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const cart = useSelector((state) => state.cart);
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
          <div>
            <h3 className={styles.title}>Product</h3>

            <h3 className={styles.price}>price</h3>
            <h3 className={styles.quantity}>quantity</h3>
            <h3 className={styles.total}>total</h3>
          </div>
          <div>
            {cart.cartItems?.map((cartItem) => (
              <div>
                <CartItem key={cartItem.id} data={cartItem} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <button>Clear Cart</button>
        <div>
          <div>
            <span>Subtotal</span>
            <span>${cart.cartTotalAmount}</span>
          </div>
          <p>Texas and Shipping calculated at Checkout</p>
          <button>Checkout</button>
          <div>
            <Link to="/products" className={styles.shopping}>
              <BsCartPlusFill />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
