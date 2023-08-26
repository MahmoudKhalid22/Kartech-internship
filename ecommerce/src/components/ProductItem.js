import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import styles from "./ProductItem.module.css";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (pr) => {
    dispatch(addToCart(pr));
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
        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductItem;
