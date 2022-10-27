
import { createSlice } from "@reduxjs/toolkit";
import { auth, database } from "../Components/config/firebaseConfig";
import {collection, getDocs} from 'firebase/firestore'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        newproducts: []
    },
    reducers: {
        getCartProducts: (state) => {
            auth.onAuthStateChanged(user => {                
            //  database.collection('Cart' + user.uid).onSnapshot(snapshot => {
            //      const newproducts = snapshot.docs.map((doc) => ({
            //          ID: doc.id,
            //          ...doc.data(),
            //      }))
            //      console.log('firebase calls');
            //      state.newproducts =  newproducts
            //  })
            const docRef = collection(database, 'Cart' + user.uid)
            const snapshots = getDocs(docRef)
            console.log(snapshots);

            })
        },
    }
})

export const { getCartProducts } = cartSlice.actions

export default cartSlice.reducer