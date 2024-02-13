import { createSelector, createSlice } from '@reduxjs/toolkit';

export const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState: {
    qrData: {},
    
  },
  reducers: {
      setQrData: (state, action) => {
        // console.log("action.payload", action.payload);
        
        
        return {
          ...state,
          qrData: action.payload
        }
      }
    },
});

export const selectQrCode = createSelector(
  (state:any) => state.qrCode,
  (substate) => substate.qrData
);

export const { setQrData } = qrCodeSlice.actions;
