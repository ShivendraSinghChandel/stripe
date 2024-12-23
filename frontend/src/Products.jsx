import { useEffect, useState } from "react";
import axios from "axios";
import { Button, message, Spin } from "antd";
import { addToCart } from "./cardSlice";
import { useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = (product) => {
    dispatch(
      addToCart({
        image: product.image,
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        qnty: 1, // Assuming quantity starts from 1
      })
    );
  };

  if (loading) {
    return <Spin tip="Loading Products..." />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: "grid", margin: "30px", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
      {products.map((product) => (
        <div key={product._id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
          <h2>{product.title}</h2>
          <img
            style={{ width: "100%", maxHeight: "200px", objectFit: "contain", marginBottom: "10px" }}
            src={product.image}
            alt={product.title}
          />
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <Button onClick={() => addToCartHandler(product)} type="primary">
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Products;
