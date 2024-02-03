import { createSelector, createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: [],
    
  },
  reducers: {
      setProfileData: (state, action) => {
        console.log("action.payload", action.payload);
        
      return {
        ...state,
        profileData: action.payload
      }
    }
  },
});

export const selectProfileInfo = createSelector(
  (state) => state.profile,
  (substate) => substate.profileData
);

export const { setProfileData } = profileSlice.actions;
