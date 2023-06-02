import { createSlice } from "@reduxjs/toolkit";
//creating a new redux slice 
export const userSlice = createSlice({
  //name of slice is set to user
  name: "user",
  //inital value has value property set to null
  initialState: {
    value: null
  },
  
  reducers: {
    //takes current state and action as argument
    //login and logout are the reducers that modify user property
    login: (state, action) => {
      //type property that specifies the type of action and a payload property that provides additional data related to the action.
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

//exports login and logout action creators
export const{login,logout}=userSlice.actions
//exporting the state of current user 
export const selectUser=(state)=>state.user.user
export default userSlice.reducer
