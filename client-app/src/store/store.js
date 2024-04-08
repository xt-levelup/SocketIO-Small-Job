import { configureStore } from "@reduxjs/toolkit";

import formSlice from "./formSlice";
import fetchDataSlice from "./fetchDataSlice";
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
        formSlice: formSlice,
        fetchDataSlice: fetchDataSlice,
        authSlice: authSlice,
    },
});

export default store;
