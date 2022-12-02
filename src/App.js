
import {  Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Login from "./Components/Authentication/Login";
import Signup from "./Components/Authentication/Signup";
import Cart from "./Components/Cart/Cart";
import Errorpage from "./Components/Errorpage/Errorpage";
import Landingpage from  "./Components/LandingPage/Landingpage"
import ExtendedProduct from "./Components/Products/Product/ExtendedProduct";
import Products from "./Components/Products/Products";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { auth } from "./Components/config/firebaseConfig";
import Review from "./Components/CustomerReview/Review";
import Account from "./Components/Account/Account";
import Receipts from "./Components/Receipts/Receipts";
import Setup from "./Components/Emailsetup/Setup";

function App() {  

  const [currentUser, setCurrentUser] = useState(null)
  function GetUserUid(){
    const [uid, setUid] = useState(null)
    useEffect(()=>{
      auth.onAuthStateChanged(user =>{
        if(user){
          setUid(user.uid)
          setCurrentUser(user)
        }
        else{
          setCurrentUser(null)
        }
      })    
    }, [])
    return uid
  }


  const uid = GetUserUid()

  return (
    <>
        
          <Toaster/>
          <Navbar currentUser = {currentUser}/>
            <Routes>

              <Route exact path = "/" element = { <Landingpage />}/>
              <Route path="/home" element = { <Products uid = {uid} /> } />
              <Route path="/signup" element = { <Signup /> } />
              <Route path="/login" element = { <Login /> } />
              <Route path = "/cart" element = { <Cart currentUser = {currentUser} uid = {uid}/>} />
              <Route path = "/extendedproduct" element = { <ExtendedProduct /> } />
              <Route path = "/admin" element = { <Admin /> } />
              <Route path = '/reviews' element = { <Review  /> }/>
              <Route path="/account" element = { <Account uid = {uid} />}/>
              <Route path="/receipts" element = { <Receipts />}/> 
              <Route path = '/setup' element = { <Setup uid = {uid}/>} />
              <Route path = "*" element = { <Errorpage />} /> 
            </Routes>

            
    </>
  );
}

export default App;