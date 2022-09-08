
import Main from "./Components/AddProduct/Main";
import Signup from "./Components/Authentication/Signup";
import Products from "./Components/Products/Products";
import { ProductsContextProvider } from "./global/ProductsContext";

function App() {
  //routing
//https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md
  

  return (
    <>
        <ProductsContextProvider>
         {/*  <Products />*/}
           {/*  <Main />*/}
           <Signup />
        </ProductsContextProvider>
        
        
    </>
  );
}

export default App;
