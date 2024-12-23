import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { decreaseQuantity, increaseQuantity, removeItem } from "./cardSlice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const myCard = useSelector((state) => state.mycard.card);
  const dispatch = useDispatch();

  // Increase quantity handler
  const qntyInc = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  // Decrease quantity handler
  const qntyDec = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  // Remove item handler
  const removeItemHandler = (id) => {
    dispatch(removeItem(id));
  };

  let sno = 0;
  let totalAmount = 0;

  // Calculate totalAmount and render cart items
  const cartItems = myCard.map((key) => {
    totalAmount += key.price * key.qnty;
    sno++;
    return (
      <tr key={key.id}>
        <td>{sno}</td>
        <td><img src={key.image} width="100" height="100" alt={key.title} /></td>
        <td>{key.title}</td>
        <td style={{width:"300px"}}>{key.description}</td>
        <td>{key.category}</td>
        <td>{key.price}</td>
        <td>
          <a href="#" onClick={() => qntyDec(key.id)}><FaMinusCircle /></a>
          <span style={{ marginLeft: "10px", marginRight: "10px", fontWeight: "bold", cursor: "pointer" }}>
            {key.qnty}
          </span>
          <a href="#" onClick={() => qntyInc(key.id)}><FaPlusCircle /></a>
        </td>
        <td>{key.price * key.qnty}</td>
        <td>
          <Button onClick={() => removeItemHandler(key.id)} danger>Remove</Button>
        </td>
      </tr>
    );
  });

  // If the cart is empty, show a message
  if (myCard.length === 0) {
    return <h2 align="center">Your Cart is Empty!</h2>;
  }

  return (
    <>
      <h1 align="center">Welcome to Your Cart</h1>
      <Table style={{width:"90%",margin:"auto"}} striped bordered>
        <thead style={{border:"2px solid black"}}>
          <tr>
            <th>S.No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems}
          <tr>
            <td colSpan="6" style={{ textAlign: "right", fontWeight: "bold" }}>Net Amount</td>
            <td>{totalAmount}/-</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="7" style={{ textAlign: "right" }}>
              <Button
                type="primary"
                onClick={() => navigate(`/checkout/${totalAmount}`)}
                style={{ backgroundColor: "#ffcc00", borderRadius: "10px" }}
              >
                Checkout
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Cart;
