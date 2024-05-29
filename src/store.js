import { configureStore, createSlice } from '@reduxjs/toolkit';

// 더 불러온 책 store에서 임시 보관
const booklist = createSlice({
    name: "booklist",
    initialState: [],
    reducers: {
        updateBooklist (state, action){
            let temp = [...state, ...action.payload]
            state = [...temp]
            return temp
        },
        cleanBooklist (){
          return []
        }
    },
});

export let { updateBooklist, cleanBooklist } = booklist.actions

export default configureStore({
  reducer: {
    booklist : booklist.reducer
  },
})