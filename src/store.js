import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const imageLoad = createSlice({
    name: "imageLoad",
    initialState: true,
    reducers: {
        updateLoad (state, action){
            // console.log(action.payload)
            return action.payload
        },
    },
});

export let { updateLoad } = imageLoad.actions

export default configureStore({
  reducer: {
    imageLoad : imageLoad.reducer
  },
})