import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    staff:null,
    token:null,
    error:null,
    loading:false
};

const loginSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginRequest:(state)=>{
            state.error = null
            state.loading = true
        },
        loginSuccess:(state,action)=>{
            state.staff = action.payload.staff;
            state.token = action.payload.token
            state.loading = false
        },
        loginFailure:(state,action)=>{
            state.error = action.payload
            state.loading = false
        },
        logoutRequest:(state)=>{
            state.error = null
        },
        logoutSuccess:(state,action)=>{
            state.staff = "";
            state.token = ""
        },
        logoutFailure:(state,action)=>{
            state.error = action.payload
        }
    }
})

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} = loginSlice.actions

export default loginSlice.reducer