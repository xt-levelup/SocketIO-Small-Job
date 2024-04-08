import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialProducts = [];

export const fetchProducts = createAsyncThunk(
    "fetchDataSlice/fetchProducts",
    async () => {
        const serverUrl = "http://localhost:5000/get-products";
        const fetchData = await fetch(serverUrl);
        if (!fetchData.ok) {
            throw new Error("Cannot get data from server");
        } else {
            const data = await fetchData.json();
            console.log("data from server:", data);
            return data;
        }
    }
);

const fetchDataSlice = createSlice({
    name: "fetchDataSlice",
    initialState: initialProducts,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export default fetchDataSlice.reducer;
