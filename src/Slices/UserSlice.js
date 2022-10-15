
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'getuser',
    initialState:{
        user: localStorage.getItem('user')
    },
    reducers: {
        getUserID: (state, action) => {
            state.user = action.payload
            console.log('lol');
            console.log(state.user)

        },
    }
})

export const { getUserID } = userSlice.actions

export default userSlice.reducer