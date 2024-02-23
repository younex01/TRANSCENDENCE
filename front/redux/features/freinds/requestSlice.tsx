import { createSelector, createSlice } from '@reduxjs/toolkit';
import React from 'react';

export const requestSlice = createSlice({
  name: 'request',
  initialState: {
    freindInfo: {},
    freindRequestInfo: {}
  },
  reducers: {
    setFreindInfo: (state, action) => {
        // console.log("data from reducer freinds",action.payload)
        return{
          ...state,
          freindInfo: action.payload
        }
      },
      setFreindRequestInfo: (state, action) => {
      // console.log("data from reducer freinds req",action.payload)
      return {
        ...state,
        freindRequestInfo: action.payload
      }
    }
  },
});

export const selectFreindInfo = createSelector(
  (state) => state.request,
  (substate) => substate.freindInfo
);
export const selectFreindRequestInfo = createSelector(
  (state) => state.request,
  (substate) => substate.freindRequestInfo
);

export const { setFreindInfo, setFreindRequestInfo } = requestSlice.actions;
