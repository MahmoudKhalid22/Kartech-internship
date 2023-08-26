import styles from "./CartItem.module.css";

function CartItem({ data }) {
  return (
    <div className={styles.product}>
      <img src={data.image} alt={data.name} />
      <div>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
        <button>Remove</button>
      </div>
      <p>${data.price}</p>
      <div>
        <button>-</button>
        <span>{data.cartQuantity}</span>
        <button>+</button>
      </div>
      <p className={styles.totalPrice}>${data.price * data.cartQuantity}</p>
    </div>
  );
}

export default CartItem;
