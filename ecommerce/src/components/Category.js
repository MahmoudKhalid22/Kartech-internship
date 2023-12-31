import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Category.module.css";
import { addToCart, getTotal } from "../features/cartSlice";

function Category() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://raw.githubusercontent.com/MahmoudKhalid22/Kartech-internship/main/ecommerce/data/products.json`
      );
      const data = await response.json();
      const selectedProduct = data.products?.find((item) => item.id === id);
      setProduct(selectedProduct);
    };
    getData();
  }, [id]);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={product.image} alt={product.name} />
      </div>
      <div>
        <div className={styles.details}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
        </div>

        <button
          className={styles.cart}
          onClick={() => handleAddToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Category;
