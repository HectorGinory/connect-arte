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
        updateUsernameOrEmail: (state, action) => {
            return {
                ...state,
               user: {
                    ...state.user,
                    ...action.payload
               }
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
export const { login, logout, updateUsernameOrEmail } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;