import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer, // hadapu auth slice eka methanata danawa
    },
});

// type script walata mewa oni
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;