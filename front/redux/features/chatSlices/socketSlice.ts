// socketSlice.ts
'use client'
// socketSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState: any = {
  socket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
      const { userId } = action.payload;
      state.socket = io("http://localhost:4000/");
      console.log("state.socket", state.socket)
      if (state.socket) {
        state.socket.emit('addSocketToThisUserRoom', userId);
      }
    },
    closeSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});


export const { initializeSocket, closeSocket } = socketSlice.actions;
export default socketSlice.reducer;
