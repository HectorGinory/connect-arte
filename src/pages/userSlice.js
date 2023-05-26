import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        token: ""
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                user: {},
                token: ""
            }
        }
    }
})
export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;