import { createSelector, createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: {},
    
  },
  reducers: {
      setProfileData: (state, action) => {
        
        return {
          ...state,
          profileData: action.payload
        }
      }
    },
});

export const selectProfileInfo = createSelector(
  (state:any) => state.profile,
  (substate) => substate.profileData
);

export const { setProfileData } = profileSlice.actions;
