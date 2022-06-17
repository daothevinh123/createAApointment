import { createSlice } from "@reduxjs/toolkit";
export const loginSlice = createSlice({
    name:'user',
    initialState: {
        name: '',
        isLoading:false,
        token:'',
        status:'',
        error:'',    
    },
    reducers: {
    loginRequest: (state , action) => {
 
  
        state.isLoading = true;

     
      
   },

    loginSuccess: (state , action) => {
         state.name = action.payload
         state.token = action.payload.token
         state.error = action.payload

    
       
    },
    loginFailure: (state , action) => {
        state.isLoading = false;
        state.error = action.payload

   
      
   },
   
   loginStatus: (state , action) => {

    state.status = action.payload.status
   

  
},

    }
})
// const  {  reducer , actions} = registerSlice
export const {loginRequest , loginSuccess , loginFailure , loginStatus } = loginSlice.actions
export default loginSlice.reducer