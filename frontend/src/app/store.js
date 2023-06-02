import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/userSlice'
import searchReducer from '../feature/searchSlice'
export default configureStore({
  reducer:{
    user:userReducer,
    search: searchReducer
  }
})