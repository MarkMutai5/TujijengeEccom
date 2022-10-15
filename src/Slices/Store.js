
import { configureStore } from "@reduxjs/toolkit"; 
import getuserReducer from '../Slices/UserSlice'

export default configureStore({
    reducer: {
        getuser: getuserReducer,
    },
})