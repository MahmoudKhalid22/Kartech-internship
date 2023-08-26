import { useGetAllProductsQuery } from "../features/productsApi";
import ProductItem from "../components/ProductItem";
import styles from "./Products.module.css";

function Products() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <div className={styles.container}>
      {isLoading ? (
        <h3 className={styles.loading}>Loading...</h3>
      ) : error ? (
        <h3 className={styles.error}>An error occuered!</h3>
      ) : (
        <div className={styles.products}>
          {data?.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
