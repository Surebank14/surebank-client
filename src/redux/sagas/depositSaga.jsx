import {call, put,all, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {
    fetchDepositRequest,
    fetchDepositSuccess,
    fetchDepositFailure,
    createCostPriceRequest,
    createCostPriceSuccess,
    createCostPriceFailure,
    fetchCustomerAccountRequest,
    fetchCustomerAccountSuccess,
    fetchCustomerAccountFailure,
    fetchSubAccountDepositRequest,
    fetchSubAccountDepositSuccess,
    fetchSubAccountDepositFailure,
    createDepositRequest,
    createDepositSuccess,
    createDepositFailure,
    createSBDepositRequest,
    createSBDepositSuccess,
    createSBDepositFailure,
    createMainWithdrawalRequest,
    createMainWithdrawalSuccess,
    createMainWithdrawalFailure,
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
    editCustomerFDAccountFailure
} from '../slices/depositSlice'
import { url } from './url'
// import {sendTemplateMessage} from '../../Components/WhatsappNotification'

 function* fetchDepositSaga(){
    try {
        const response = yield call(axios.get, `${url}/api/dsaccount/deposit`)
        yield put(fetchDepositSuccess(response.data))
    } catch (error) {
        yield put(fetchDepositFailure(error.response.data.message))
    }
}

 function* fetchSubAccountDepositSaga(action){
    const {customerId} = action.payload
    try {
        const response = yield call(axios.get,`${url}/api/dsaccount/${customerId}`);
        yield put(fetchSubAccountDepositSuccess(response.data))
    } catch (error) {
        yield put(fetchSubAccountDepositFailure(error.response.data.message))
    }
}

function* createDepositSaga(action) {
    const { details } = action.payload;
  
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make deposit request
      const response = yield call(
        axios.post,
        `${url}/api/dsaccount/deposit`,
        details,
        config
      );
  
      // Dispatch deposit success action
      yield put(createDepositSuccess(response.data));
      // After deposit, refresh customer account details
      yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      yield put(createDepositFailure(errorMessage));
    }
  }
function* createCostPriceSaga(action) {
    const { details } = action.payload;
  console.log("cost price",details)
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make deposit request
      const response = yield call(
        axios.put,
        `${url}/api/sbaccount/costprice`,
        details,
        config
      );
  
      // Dispatch deposit success action
      yield put(createCostPriceSuccess(response.data));
      // After deposit, refresh customer account details
      yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      yield put(createCostPriceFailure(errorMessage));
    }
  }
function* createSBDepositSaga(action) {
    const { details } = action.payload;
  
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Make deposit request
      const response = yield call(
        axios.post,
        `${url}/api/sbaccount/deposit`,
        details,
        config
      );
  
      // Dispatch deposit success action
    //   const amount = response.data.data.newTransaction.amount
    //   const balance = response.data.data.newTransaction.balance
    //   const direction = 'deposit'
    //   sendTemplateMessage(amount,balance,direction)
      yield put(createSBDepositSuccess(response.data));
      // After deposit, refresh customer account details
      yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      yield put(createSBDepositFailure(errorMessage));
    }
  }
  function* createWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount/withdrawal`, details,config);
        yield put(createWithdrawalSuccess(response.data))
           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createWithdrawalFailure(errorMessage))
    }
}
  function* createSBWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/sbaccount/withdrawal`, details,config);
        yield put(createSBWithdrawalSuccess(response.data))

           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createSBWithdrawalFailure(errorMessage))
    }
}
  function* createFDWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/fdaccount/imaturewithdrawal`, details,config);
        yield put(createFDWithdrawalSuccess(response.data))

           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createFDWithdrawalFailure(errorMessage))
    }
}
  function* createSBSellProductSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/sbaccount/sellproduct`, details,config);
        yield put(createSBSellProductSuccess(response.data))

           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createSBSellProductFailure(errorMessage))
    }
}
  function* createFDMaturedWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/fdaccount/withdrawal`, details,config);
        yield put(createFDMaturedWithdrawalSuccess(response.data))

           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.message
        yield put(createFDMaturedWithdrawalFailure(errorMessage))
    }
}
  function* createMainWithdrawalSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log("33",details)
        const response = yield call(axios.post,`${url}/api/dsaccount/mainwithdrawal`, details,config);
        yield put(createMainWithdrawalSuccess(response.data))
           yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        console.log("errrror",error)
        const errorMessage = error.response?.data?.message
        yield put(createMainWithdrawalFailure(errorMessage))
    }
}
function* createCustomerAccountSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/dsaccount`, details,config);
        yield put(createCustomerAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createCustomerAccountFailure(errorMessage))
    }
}
function* createCustomerSBAccountSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/sbaccount`, details,config);
        yield put(createCustomerSBAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createCustomerSBAccountFailure(errorMessage))
    }
}
function* createCustomerFDAccountSaga(action){
    const {details,navigate} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.post,`${url}/api/fdaccount`, details,config);
        yield put(createCustomerFDAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        navigate('/deposit')
    } catch (error) {
        const errorMessage = error.response?.data?.error
        yield put(createCustomerFDAccountFailure(errorMessage))
    }
}
function* editCustomerAccountSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put,`${url}/api/dsaccount`, details,config);
        yield put(editCustomerAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        yield put(editCustomerAccountFailure(error.message))
    }
}
function* editCustomerSBAccountSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put,`${url}/api/sbaccount`, details,config);
        yield put(editCustomerSBAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        yield put(editCustomerSBAccountFailure(error.message))
    }
}
function* editCustomerFDAccountSaga(action){
    const {details} = action.payload
    try {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = yield call(axios.put,`${url}/api/fdaccount`, details,config);
        yield put(editCustomerFDAccountSuccess(response.data))
        yield call(fetchCustomerAccountSaga, { payload: { customerId: details.customerId } });
        // navigate('/deposit')
    } catch (error) {
        yield put(editCustomerFDAccountFailure(error.message))
    }
}
  
function* fetchCustomerAccountSaga(action) {
  const { customerId } = action.payload;
  try {
    // Fetch all required data in parallel
    const [accountResponse, customerResponse, dsAccountResponse, sbAccountResponse,fdAccountResponse] = yield all([
      call(axios.post, `${url}/api/account/${customerId}`),
      call(axios.get, `${url}/api/customer/${customerId}`),
      call(axios.get, `${url}/api/dsaccount/${customerId}`),
      call(axios.get, `${url}/api/sbaccount/${customerId}`),
      call(axios.get, `${url}/api/fdaccount/${customerId}`),
    ]);

    // Combine dsAccountResponse and sbAccountResponse into one object
    const subAccount = {
      dsAccount: dsAccountResponse.data,
      sbAccount: sbAccountResponse.data,
      fdAccount: fdAccountResponse.data,
    };

    // Store customer ID and name in local storage
    localStorage.setItem("customerId", customerId);
    localStorage.setItem("customerName", customerResponse.data?.name);

    // Dispatch success action with all fetched data
    yield put(
      fetchCustomerAccountSuccess({
        account: accountResponse.data,
        customer: customerResponse.data,
        subAccount, // Combined object
      })
    );

  } catch (error) {
    console.error("Customer Account Fetch Error:", error.message);
    yield put(fetchCustomerAccountFailure(error.message));
  }
}

function* depositSaga(){
    yield takeLatest(fetchDepositRequest.type, fetchDepositSaga)
    yield takeLatest(createCostPriceRequest.type,createCostPriceSaga)
    yield takeLatest(fetchSubAccountDepositRequest.type, fetchSubAccountDepositSaga)
    yield takeLatest(createDepositRequest.type, createDepositSaga)
    yield takeLatest(createSBDepositRequest.type, createSBDepositSaga)
    yield takeLatest(fetchCustomerAccountRequest.type, fetchCustomerAccountSaga)
    yield takeLatest(createMainWithdrawalRequest.type, createMainWithdrawalSaga)
    yield takeLatest(createWithdrawalRequest.type, createWithdrawalSaga)
    yield takeLatest(createSBWithdrawalRequest.type, createSBWithdrawalSaga)
    yield takeLatest(createFDWithdrawalRequest.type, createFDWithdrawalSaga)
    yield takeLatest(createSBSellProductRequest.type, createSBSellProductSaga)
    yield takeLatest(createFDMaturedWithdrawalRequest.type, createFDMaturedWithdrawalSaga)
    yield takeLatest(createCustomerAccountRequest.type, createCustomerAccountSaga)
    yield takeLatest(createCustomerSBAccountRequest.type, createCustomerSBAccountSaga)
    yield takeLatest(createCustomerFDAccountRequest.type, createCustomerFDAccountSaga)
    yield takeLatest(editCustomerAccountRequest.type, editCustomerAccountSaga)
    yield takeLatest(editCustomerSBAccountRequest.type, editCustomerSBAccountSaga)
    yield takeLatest(editCustomerFDAccountRequest.type, editCustomerFDAccountSaga)
}

export default depositSaga