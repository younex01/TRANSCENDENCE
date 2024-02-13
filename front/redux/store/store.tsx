import { configureStore } from '@reduxjs/toolkit'
import { requestSlice } from '../features/freinds/requestSlice'
import { achievementSlice } from '../features/achievement/achievementSlice';
import { profileSlice } from '../features/profile/profileSlice';
import { qrCodeSlice } from '../features/qrcode/qrCodeSlice';
import socketReducer from "../features/chatSlices/socketSlice";
import groupReducer from "../features/chatSlices/create_join_GroupSlice";
import selectConvoReducer from "../features/chatSlices/selecConvoSlice";


const store = configureStore({
    reducer: {
        request: requestSlice.reducer,
        achievement: achievementSlice.reducer,
        profile: profileSlice.reducer,
        qrCode: qrCodeSlice.reducer,
        socket: socketReducer,
        group: groupReducer,
        seelctedConversation:  selectConvoReducer
    }
   })
export type RootState = ReturnType<typeof store.getState>;
export default store;