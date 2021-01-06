import {all, takeLatest, put, call, select} from 'redux-saga/effects';
import { clearCart, setCart } from './cart.actions';
import {selectCurrentUser} from '../user/user.selectors';
import { firestore } from '../../firebase/firebase.utils';
import { selectCartItems } from './cart.selectors';

// function* clearCartSaga() {
//     yield put(clearCart());
// }


function* updateFirestoreCart() {
    const currentUser = yield select(selectCurrentUser);
    const cartItems = yield select(selectCartItems);
    if (currentUser) {
        const docRef = firestore.collection('cart').doc(currentUser.id);
        yield docRef.set({
            items: cartItems
        });
    }
}

function* fetchCart() {
    const currentUser = yield select(selectCurrentUser);
    if (currentUser) {
        const doc = yield firestore.collection('cart').doc(currentUser.id).get();
        if (doc.exists) {
            const cart = doc.data().items;
            yield put(setCart(cart));
        }
    }
}

function* onSignIn() {
    yield takeLatest('SIGN_IN_SUCCESS', fetchCart);
}

// function* onSignOut() {
//     yield takeLatest('SIGN_OUT_START', clearCartSaga);
// }

function* onCartChange() {
    yield takeLatest(['ADD_CART_ITEM', 'REMOVE_CART_ITEM', 'CLEAR_CART_ITEM', 'CLEAR_CART'], updateFirestoreCart);
}

export default function* cartSagas() {
    yield all([
        //call(onSignOut),
        call(onCartChange),
        call(onSignIn)
    ]);
}