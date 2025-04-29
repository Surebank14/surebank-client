import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
    loginRequest, 
    loginSuccess, 
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure
} from '../slices/loginSlice';
import { url } from './url';
function* loginSaga(action){
    const {credentials,navigate} = action.payload
    try {
        const response = yield call(axios.post,`${url}/api/login`, credentials);
        const { token,customer } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('customerId', customer.id);
        localStorage.setItem('customerEmail', customer.email);
        localStorage.setItem('customerRole', customer.role);
        localStorage.setItem('customerBranch', customer.branch);
        yield put(loginSuccess(response.data))
        navigate(`/customeraccountdashboard/${customer.id}`)
    } catch (error) {
        yield put(loginFailure(error.message))
    }
}
function* logoutSaga(action){
    const { navigate } = action.payload;
    try {
        // Clear user data from local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('staffId');
        localStorage.removeItem('staffEmail');
        localStorage.removeItem('staffRole');
        localStorage.removeItem('staffBranch');
        navigate('/');

        // Dispatch logout success action
        yield put(logoutSuccess());

        // Navigate to login page
    } catch (error) {
        yield put(logoutFailure(error.message));
    }
}

function* authSaga(){
    yield takeLatest(loginRequest.type, loginSaga)
    yield takeLatest(logoutRequest.type, logoutSaga)
}

export default authSaga;