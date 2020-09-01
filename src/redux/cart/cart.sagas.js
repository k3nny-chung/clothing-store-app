import {all, takeLatest, put, call} from 'redux-saga/effects';
import { clearCart } from './cart.actions';

function* clearCartSaga() {
    yield put(clearCart());
}


function* onSignOut() {
    yield takeLatest('SIGN_OUT_START', clearCartSaga);
}

export default function* cartSagas() {
    yield all([
        call(onSignOut)
    ]);
}