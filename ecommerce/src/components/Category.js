import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Category.module.css";

function Category() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:5000/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };
    getData();
  }, [id]);
  console.log(product);
  return (
    <div>
      <div>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles.details}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <div>
        <button>-</button>
        <span></span>
        <button>+</button>
      </div>
      <button className={styles.cart}>Add To Cart</button>
    </div>
  );
}

export default Category;
