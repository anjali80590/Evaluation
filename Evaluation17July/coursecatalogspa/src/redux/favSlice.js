import { createSlice } from "@reduxjs/toolkit";
let favSlice=createSlice({
    name:"fav",
    initialState:[],
    reducers:{
        addFav:(state,action)=>{
            if(!state.find(c=>c.id===action.payload.id)){
                 state.push(action.payload);
            };
        },
        removeFav:(state,action)=>{
            return state.filter(c=>c.id!==action.payload);
        }
    }
})

export let{addFav,removeFav}=favSlice.actions;
export default favSlice.reducer;