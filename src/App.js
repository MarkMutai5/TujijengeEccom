
import {  Route, Routes } from "react-router-dom";
import Main from "./Components/AddProduct/Main";
import Admin from "./Components/Admin/Admin";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Cart from "./Components/Cart/Cart";
import Errorpage from "./Components/Errorpage/Errorpage";
import Landingpage from  "./Components/LandingPage/Landingpage"
import ExtendedProduct from "./Components/Products/Product/ExtendedProduct";
import Products from "./Components/Products/Products";
import User from "./Components/Users/User";
import { ProductsContextProvider } from "./global/ProductsContext";
import { ToastContainer } from 'react-toastify';

function App() {  

  return (
    <>
        <ProductsContextProvider>
          <ToastContainer/>
            <Routes>

              <Route exact path = "/" element = { <Landingpage />}/>
              <Route path="/home" element = { <Products /> } />
              <Route path="/addproducts" element = { <Main /> } />
              <Route path="/signup" element = { <Signup /> } />
              <Route path="/login" element = { <Login /> } />
              <Route path = "/cart" element = { <Cart />} />
              <Route path = "/extendedproduct" element = { <ExtendedProduct /> } />
              <Route path = "/admin" element = { <Admin /> } />
              <Route path = '/user' element = { <User />}/>
              <Route path = " * " element = { <Errorpage />} />
              
              
            </Routes>
        </ProductsContextProvider>
        
        
    </>
  );
}

export default App;
