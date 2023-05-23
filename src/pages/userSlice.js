import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            name: "héctor",
            surnames: ["ginory","alemán"],
            email: "hginory@gmail.com",
            password: "examplePassword11",
            username: "hectorginory"
        },
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
                credentials:{}
            }
        }
    }
})
export const { login, logout } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;