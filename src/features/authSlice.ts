import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api"; 

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    loading: boolean; 
}

export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/me'); 
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Error fetching user");
    }
  }
);

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,

    loading: !!localStorage.getItem('accessToken'), 
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            localStorage.removeItem('accessToken');
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(fetchUserDetails.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            });
    }
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;