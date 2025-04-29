import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchAllCustomerAccountRequest,
    fetchAllCustomerAccountSuccess,
    fetchAllCustomerAccountFailure,
    fetchAccountTransactionRequest,
    fetchAccountTransactionSuccess,
    fetchAccountTransactionFailure,
} from '../slices/createAccountSlice'
import { url } from './url'

 function* fetchAllCustomerAccountSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount`)
        yield put(fetchAllCustomerAccountSuccess(response.data))
    } catch (error) {
        yield put(fetchAllCustomerAccountFailure(error.response.data.message))
    }
}
 function* fetchAccountTransactionSaga(action){

  const { accountTypeId } = action.payload;

    try {
        const response = yield call(axios.get, `${url}/api/customertransaction/${accountTypeId}`)
        console.log("transaction",response)
        yield put(fetchAccountTransactionSuccess(response.data))
    } catch (error) {
        yield put(fetchAccountTransactionFailure(error.response.data.message))
    }
}

function* customerAccountSaga(){
    yield takeLatest(fetchAllCustomerAccountRequest.type, fetchAllCustomerAccountSaga)
    yield takeLatest(fetchAccountTransactionRequest.type, fetchAccountTransactionSaga)
}

export default customerAccountSaga