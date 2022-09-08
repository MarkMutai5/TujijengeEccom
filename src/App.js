
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Components/AddProduct/Main";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Products from "./Components/Products/Products";
import { ProductsContextProvider } from "./global/ProductsContext";

function App() {
  //routing
//https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
  

  return (
    <>
        <ProductsContextProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element = { <Products /> } />
            <Route path="/addproducts" element = {<Main /> } />
            <Route path="/signup" element = { <Signup /> } />
            <Route path="/login" element = { <Login /> } />
          </Routes>
          </BrowserRouter>
         
        </ProductsContextProvider>
        
        
    </>
  );
}

export default App;
