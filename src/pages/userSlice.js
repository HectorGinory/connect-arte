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
        updateUserRdx: (state, action) => {
            return {
                ...state,
               user: {
                    ...action.payload
               }
            }
        },
        logout: (state, action) => {
            return {
                user: {},
                token: ""
            }
        },
        updateToken: (state,action) => {
            return {
                ...state,
             ...action.payload
            }
        }
    }
})
export const { login, logout, updateUserRdx, updateToken } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;