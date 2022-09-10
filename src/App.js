
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/AddProduct/Main";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Cart from "./Components/Cart/Cart";
import Errorpage from "./Components/Errorpage/Errorpage";
import Products from "./Components/Products/Products";
import { CartContextProvider } from "./global/CartContext";
import { ProductsContextProvider } from "./global/ProductsContext";

function App() {
  //routing
//https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
  

  return (
    <>
        <ProductsContextProvider>
          <CartContextProvider>
        
          <BrowserRouter>
            <Routes>

              <Route exact path="/" element = { <Products /> } />
              <Route path="/addproducts" element = { <Main /> } />
              <Route path="/signup" element = { <Signup /> } />
              <Route path="/login" element = { <Login /> } />
              <Route path = "/cart" element = { <Cart />} />
              <Route path = " * " element = { <Errorpage />} />
              
            </Routes>
          </BrowserRouter>
         
          </CartContextProvider>
        </ProductsContextProvider>
        
        
    </>
  );
}

export default App;
