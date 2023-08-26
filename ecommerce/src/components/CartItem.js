import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";
import styles from "./CartItem.module.css";

function CartItem({ data }) {
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className={styles.product}>
      <img src={data.image} alt={data.name} />
      <div>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <button className={styles.remove} onClick={() => handleRemove(data)}>
          Remove
        </button>
        <div className={styles.bottom}>
          <p>${data.price}</p>
          <div className={styles.btns}>
            <button>-</button>
            <span>{data.cartQuantity}</span>
            <button>+</button>
          </div>
          <div>
            <span>total</span>
            <p className={styles.totalPrice}>
              ${data.price * data.cartQuantity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
