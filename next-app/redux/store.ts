import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./features/socketSlice";
import groupReducer from "./features/create_join_GroupSlice";
import selectConvoReducer from "./features/selecConvoSlice";
import updateConvoListReducer from "./features/updateConvosSlice";

export const store = configureStore({
    reducer: {
        socket: socketReducer,
        group: groupReducer,
        seelctedConversation:  selectConvoReducer,
        updateConvolist: updateConvoListReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;