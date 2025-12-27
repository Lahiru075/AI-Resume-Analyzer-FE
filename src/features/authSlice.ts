import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// store krana data wala types
interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
}

// initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // This function is called when the user logs in
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        // This function is called when the user logs out
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    }
})


export const { loginSuccess, logoutSuccess} = authSlice.actions;
export default authSlice.reducer