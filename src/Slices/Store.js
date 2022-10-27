
import { configureStore } from "@reduxjs/toolkit"; 
import { userSlice } from '../Slices/UserSlice'
import {cartSlice} from '../Slices/CartSlice'

export default configureStore({
    reducer: {
        getuser: userSlice.reducer,
        cart: cartSlice.reducer,
    },
})