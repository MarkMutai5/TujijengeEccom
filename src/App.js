
import Main from "./Components/AddProduct/Main";
import Products from "./Components/Products/Products";
import { ProductsContextProvider } from "./global/ProductsContext";

function App() {

  

  return (
    <>
        <ProductsContextProvider>
           <Products />
           {/*  <Main />*/}
        </ProductsContextProvider>
        
        
    </>
  );
}

export default App;
