import { BrowserRouter,Route,Routes } from "react-router-dom";
import Topmenu from "./TopMenu";
import Products from "./Products";
import Home from "./Home";
import Cart from "./Cart";
import SuccessPage from "./SuccessPage";
import CancelPage from "./CancelPage";
import CheckoutPage from "./Checkout";

const App=()=>{
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Topmenu/>}>
        <Route index element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/product" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout/:totalamount" element={<CheckoutPage/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path="/cancel" element={<CancelPage/>}/>

        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;