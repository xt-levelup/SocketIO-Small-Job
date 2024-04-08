import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: false,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        authUpdate(state, action) {
            state.auth = action.payload;
        },
    },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
