import { configureStore } from "@reduxjs/toolkit";

import errorReducer from "~/store/slices/errorSlice";
import uiReducer from "~/store/slices/uiSlice";

export const store = configureStore({
    reducer: {
        error: errorReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
