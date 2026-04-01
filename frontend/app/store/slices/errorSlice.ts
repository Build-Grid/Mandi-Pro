import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { ERROR_SOURCES } from "~/constants/errors";

export type ErrorSource = (typeof ERROR_SOURCES)[keyof typeof ERROR_SOURCES];

interface GlobalErrorPayload {
    message: string;
    source: ErrorSource;
    details?: string;
}

interface GlobalErrorState {
    activeError: GlobalErrorPayload | null;
}

const initialState: GlobalErrorState = {
    activeError: null,
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setGlobalError(state, action: PayloadAction<GlobalErrorPayload>) {
            state.activeError = action.payload;
        },
        clearGlobalError(state) {
            state.activeError = null;
        },
    },
});

export const { setGlobalError, clearGlobalError } = errorSlice.actions;
export default errorSlice.reducer;
