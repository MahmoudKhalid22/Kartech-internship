import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <h1>Blossom Boutique: Where Floral Dreams Come to Life</h1>
        <p>
          Welcome to Blossom Boutique, your go-to online destination for
          stunning floral arrangements. Our expert florists handcraft each
          bouquet with care, ensuring that every bloom is vibrant and beautiful.
          With our user-friendly website, finding the perfect floral gift is a
          breeze. Let Blossom Boutique help you create unforgettable moments
          with the timeless beauty of flowers.
        </p>
        <Link to="/products">Go to Products</Link>
      </div>
    </div>
  );
}

export default Home;
