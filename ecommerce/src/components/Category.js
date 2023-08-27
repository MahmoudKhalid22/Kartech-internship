import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Category.module.css";
import { addToCart } from "../features/cartSlice";

function Category() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    getData();
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
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
