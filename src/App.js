
import Main from "./Components/AddProduct/Main";
import Products from "./Components/Products/Products";

function App() {

  const products = [
    {id: 1, name: 'Cement', description: 'Simba cement', price: 'KES600', img: 'https://savannahcement.com/images/product10.png'},
    {id: 2, name: 'Cement', description: 'Savannah cement', price: 'KES600', img: 'helmet.png'},
    {id: 2, name: 'Cement', description: 'Savannah cement', price: 'KES600', img: 'helmet.png'},
    {id: 3, name: 'Cement', description: 'Blue triangle cement', price: 'KES600', img: 'helmet.png'}
  ] 

  return (
    <>
        
        {/*<Products products = {products}/>*/}
        <Main />
        
    </>
  );
}

export default App;
