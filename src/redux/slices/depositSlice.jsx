import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    deposit:null,
    loading: false,
    error:null,
};

const depositSlice = createSlice({
    name:'deposit',
    initialState,
    reducers:{
        fetchDepositRequest:(state)=>{
            state.loading = true
        },
        fetchDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchDepositFailure:(state,action)=>{
            state.error = action.payload
        },
        createCostPriceRequest:(state)=>{
            state.loading = true
        },
        createCostPriceSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        createCostPriceFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerAccountSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerByIdRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerByIdSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerByIdFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchCustomerSubAccountRequest:(state)=>{
            state.loading = true
        },
        fetchCustomerSubAccountSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchCustomerSubAccountFailure:(state,action)=>{
            state.error = action.payload
        },
        fetchSubAccountDepositRequest:(state)=>{
            state.loading = true
        },
        fetchSubAccountDepositSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchSubAccountDepositFailure:(state,action)=>{
            state.error = action.payload
        },
        createDepositRequest:(state)=>{
            state.loading=true
        },
        createDepositSuccess:(state,action)=>{
            state.deposit = action.payload
            state.loading=false
        },
        createDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createSBDepositRequest:(state)=>{
            state.loading=true
        },
        createSBDepositSuccess:(state,action)=>{
            state.deposit = action.payload
            state.loading=false
        },
        createSBDepositFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        fetchWithdrawalRequest:(state)=>{
            state.loading = true
        },
        fetchWithdrawalSuccess:(state,action)=>{
            state.deposit= action.payload;
            state.loading=false
        },
        fetchWithdrawalFailure:(state,action)=>{
            state.error = action.payload
        },
        createWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createWithdrawalSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createSBWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createSBWithdrawalSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createSBWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createFDWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createFDWithdrawalSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createFDWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createSBSellProductRequest:(state)=>{
            state.loading=true
        },
        createSBSellProductSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createSBSellProductFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createFDMaturedWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createFDMaturedWithdrawalSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createFDMaturedWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createMainWithdrawalRequest:(state)=>{
            state.loading=true
        },
        createMainWithdrawalSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createMainWithdrawalFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerAccountSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerSBAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerSBAccountSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createCustomerSBAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        createCustomerFDAccountRequest:(state)=>{
            state.loading=true
        },
        createCustomerFDAccountSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        createCustomerFDAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerAccountSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        editCustomerAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerSBAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerSBAccountSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        editCustomerSBAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        editCustomerFDAccountRequest:(state)=>{
            state.loading=true
        },
        editCustomerFDAccountSuccess:(state,action)=>{
            state.deposit=action.payload
            state.loading=false
        },
        editCustomerFDAccountFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        clearDepositError: (state) => {
            state.error = null; // Reset error state
          },
        
    }
})

export const {
    fetchDepositRequest,
    fetchDepositSuccess,
    fetchDepositFailure,
    createCostPriceRequest,
    createCostPriceSuccess,
    createCostPriceFailure,
    fetchCustomerAccountRequest,
    fetchCustomerAccountSuccess,
    fetchCustomerAccountFailure,
    fetchCustomerByIdRequest,
    fetchCustomerByIdSuccess,
    fetchCustomerByIdFailure,
    fetchCustomerSubAccountRequest,
    fetchCustomerSubAccountSuccess,
    fetchCustomerSubAccountFailure,
    fetchSubAccountDepositRequest,
    fetchSubAccountDepositSuccess,
    fetchSubAccountDepositFailure,
    createDepositRequest,
    createDepositSuccess,
    createDepositFailure,
    createSBDepositRequest,
    createSBDepositSuccess,
    createSBDepositFailure,
    fetchWithdrawalRequest,
    fetchWithdrawalSuccess,
    fetchWithdrawalFailure,
    createWithdrawalRequest,
    createWithdrawalSuccess,
    createWithdrawalFailure,
    createSBWithdrawalRequest,
    createSBWithdrawalSuccess,
    createSBWithdrawalFailure,
    createFDWithdrawalRequest,
    createFDWithdrawalSuccess,
    createFDWithdrawalFailure,
    createSBSellProductRequest,
    createSBSellProductSuccess,
    createSBSellProductFailure,
    createFDMaturedWithdrawalRequest,
    createFDMaturedWithdrawalSuccess,
    createFDMaturedWithdrawalFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure,
    createCustomerAccountRequest,
    createCustomerAccountSuccess,
    createCustomerAccountFailure,
    createCustomerSBAccountRequest,
    createCustomerSBAccountSuccess,
    createCustomerSBAccountFailure,
    createCustomerFDAccountRequest,
    createCustomerFDAccountSuccess,
    createCustomerFDAccountFailure,
    editCustomerAccountRequest,
    editCustomerAccountSuccess,
    editCustomerAccountFailure,
    editCustomerSBAccountRequest,
    editCustomerSBAccountSuccess,
    editCustomerSBAccountFailure,
    editCustomerFDAccountRequest,
    editCustomerFDAccountSuccess,
    editCustomerFDAccountFailure,
    clearDepositError
} = depositSlice.actions

export default depositSlice.reducer