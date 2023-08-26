import { useEffect } from "react";

function Products() {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      console.log(data);
    };
    getData();
  
  });
  return (
    <div>Products</div>
  )
}

export default Products;
