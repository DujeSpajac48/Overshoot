import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
   split :'',
   duration : '',
   type : '',
   diff : '',
   workouts : [],


}


export const workoutSlice = createSlice({
   name : 'workout',
   initialState,
   reducers:{
      setSplit: (state,action) =>{
         state.split = action.payload;
      },
      setDuration: (state,action)=>{
         state.split = action.payload;
      },
      setType: (state,action) =>{
         state.type = action.payload;
      },
      setDiff: (state,action) =>{
         state.diff = action.payload;
      },
      addWorkout: (state,action)=>{
         state.workouts.push(action.payload);
      }
   }
})

export const { setSplit, setDuration, setType,setSkill,addWorkout} = workoutSlice.actions;
export default workoutSlice.reducer;