'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketId: null,
  },
  reducers: {
    setSocketId: (state, action: PayloadAction<any>) => {
      state.socketId = action.payload;
    },
  },
});


export const { setSocketId } = socketSlice.actions;
export default socketSlice.reducer;
