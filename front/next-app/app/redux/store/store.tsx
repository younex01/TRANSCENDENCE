import { configureStore } from '@reduxjs/toolkit'
import { requestSlice } from '../features/freinds/requestSlice'
import { createWrapper } from 'next-redux-wrapper';
import { achievementSlice } from '../features/achievement/achievementSlice';
import { profileSlice } from '../features/profile/profileSlice';


const store = configureStore({
    reducer: {
        request: requestSlice.reducer,
        achievement: achievementSlice.reducer,
        profile: profileSlice.reducer
    }
   })

export default store;