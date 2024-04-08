import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    title: "",
    imageUrl: "",
    price: "",
    description: "",
};

const formSlice = createSlice({
    initialState: initialValue,
    name: "form-slice",
    reducers: {
        titleUpdate(state, action) {
            state.title = action.payload;
        },
        imageUrlUpdate(state, action) {
            state.imageUrl = action.payload;
        },
        priceUpdate(state, action) {
            state.price = action.payload;
        },
        descriptionUpdate(state, action) {
            state.description = action.payload;
        },
    },
});

export const formSliceActions = formSlice.actions;

export default formSlice.reducer;
