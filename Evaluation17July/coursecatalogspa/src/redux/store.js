import { configureStore } from "@reduxjs/toolkit";
import favReducer from './favSlice'
export let store=configureStore({
    reducer:{fav:favReducer}
})