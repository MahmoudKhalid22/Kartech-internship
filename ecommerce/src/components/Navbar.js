import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./Navbar.module.css";

function Navbar() {
  const [show, setShow] = useState(false);

  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (
    <nav>
      <div className={styles.image}>
        <img src={logo} alt="logo" />
      </div>
      <ul className={show ? styles.showUl : null}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/cart" className={styles.cart}>
            <AiOutlineShoppingCart />
            <span>{cartTotalQuantity}</span>
            Cart
          </Link>
        </li>
      </ul>
      <button
        className={show ? styles.show : null}
        onClick={() => setShow((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
