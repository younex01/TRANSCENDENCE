'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const updateConvosslise = createSlice({
    name: "updateConvoList",
    initialState: {
        isClicked: false
    },
    reducers: {
        setConvolist: (state, action: PayloadAction<any>) =>{
            state.isClicked = action.payload;
        }
    }
})

export const {setConvolist} = updateConvosslise.actions;
export default updateConvosslise.reducer;