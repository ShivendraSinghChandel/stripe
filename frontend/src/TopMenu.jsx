import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
const Topmenu = () => {
  const data=useSelector((state)=>(state.mycard.totalQuantity))
  return (
    <>
      <div style={{color:"white",margin:"auto",backgroundColor:"blue",padding:"20px"}}>
        <Link style={{textDecoration:"none",marginLeft:"20px",color:"white",fontSize:"20px"}} to="/home">Home</Link>
        <Link style={{textDecoration:"none",marginLeft:"10px",color:"white",fontSize:"20px"}} to="/product">Product</Link>
        <Link style={{textDecoration:"none",marginLeft:"10px",color:"white",fontSize:"20px"}} to="/cart">Cart [{data}]</Link>
      </div>
      <Outlet/>
    </>
  );
};

export default Topmenu;
