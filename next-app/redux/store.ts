import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./features/socketSlice";
import groupReducer from "./features/create_join_GroupSlice";
import selectConvoReducer from "./features/selecConvoSlice";

export const store = configureStore({
    reducer: {
        socket: socketReducer,
        group: groupReducer,
        seelctedConversation:  selectConvoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;