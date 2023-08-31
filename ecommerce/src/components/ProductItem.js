import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getTotal } from "../features/cartSlice";
import styles from "./ProductItem.module.css";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleIncreaseItem = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className={styles.container}>
      <Link to={`/product/${product.id}`}>
        <div className={styles.image}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </div>
        <div>
          <h4>{product.name}</h4>
        </div>
      </Link>
      <div className={styles.details}>
        <p className={styles.price}>${product.price}</p>
        <button onClick={() => handleIncreaseItem(product)}>Add</button>
      </div>
    </div>
  );
}

export default ProductItem;
