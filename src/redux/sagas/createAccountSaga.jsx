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
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = yield call(axios.get, `${url}/api/dsaccount`,config)
        yield put(fetchAllCustomerAccountSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchAllCustomerAccountFailure(error.response.data.message))
    }
}
 function* fetchAccountTransactionSaga(action){

  const { accountTypeId } = action.payload;
  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    try {
        const response = yield call(axios.get, `${url}/api/customertransaction/${accountTypeId}`,config)
        console.log("transaction",response)
        yield put(fetchAccountTransactionSuccess(response.data))
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        yield put(fetchAccountTransactionFailure(error.response.data.message))
    }
}

function* customerAccountSaga(){
    yield takeLatest(fetchAllCustomerAccountRequest.type, fetchAllCustomerAccountSaga)
    yield takeLatest(fetchAccountTransactionRequest.type, fetchAccountTransactionSaga)
}

export default customerAccountSaga