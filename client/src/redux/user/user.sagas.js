import { auth, googleAuthProvider, createUserProfileDocument, getCurrentUser, firestore } from "../../firebase/firebase.utils";
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, registerSuccess, registerFailure, fetchOrdersFailure, fetchOrdersSuccess, fetchFavoritesSuccess, fetchFavoritesStart } from "./user.actions";
import firebase from 'firebase/app';


function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));

        yield put(fetchFavoritesStart(userSnapshot.id));

    } catch (error) {
        yield put(signInFailure(error));
    }
}  

function* googleSignInSaga() {
    try {
        const { user } = yield auth.signInWithPopup(googleAuthProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* emailSignInSaga({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user); 
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* isUserAuthenticatedSaga() {
    try {
        const user = yield getCurrentUser();
        if (!user) {
            return;
        }

        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signOutSaga() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

function* registerUserSaga({ payload: { email, password, displayName, gender } }) {
    try {
        const userCred = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(registerSuccess({
            user: userCred.user,
            additionalData: { 
                displayName, 
                gender 
            }
        }));
    } catch (error) {
        // var errorMessage = 'Oops! something wrong. Please try again later.';
        // switch (error.code) {
        //     case 'auth/email-already-in-use':
        //         errorMessage = 'The email address is already in use';
        //         break;
        //     case 'auth/invalid-email':
        //         errorMessage = 'Invalid email address';
        //         break;
        //     case 'auth/weak-password':
        //         errorMessage = 'The password is too weak.';
        //         break;
        // }

        yield put(registerFailure(error));
    }
}

function* fetchOrdersSaga({ payload: userId }) {
    try {
        const querySnapshot = yield firestore.collection('orders')
                                    .where('userID', '==', userId)
                                    .orderBy('created', 'desc')
                                    .get();
        const orders = querySnapshot.docs.map(doc => ({ 
            ...doc.data(), 
            created: doc.data().created.toDate(),
            id: doc.id 
        }));
        yield put(fetchOrdersSuccess(orders));

    } catch (error) {
        yield put(fetchOrdersFailure(error));
    }
}

function* saveFavoriteSaga({ payload: { userId, itemId } }) {
    const docRef = firestore.collection('favorites').doc(userId);

    yield docRef.set({
        itemIds:  firebase.firestore.FieldValue.arrayUnion(itemId)
    }, { merge: true });

}

function* removeFavoriteSaga({ payload: { userId, itemId } }) {
    const docRef = firestore.collection('favorites').doc(userId);
    
    yield docRef.update({
        itemIds: firebase.firestore.FieldValue.arrayRemove(itemId)
    });
}

function* fetchFavoritesSaga({ payload: userId }) {
    const doc = yield firestore.collection('favorites').doc(userId).get();
    const { itemIds } = doc.data();
    yield put(fetchFavoritesSuccess(itemIds));
}

function* signInAfterRegister({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

function* onGoogleSignIn() {
    yield takeLatest('GOOGLE_SIGN_IN_START', googleSignInSaga);
}

function* onEmailSignIn() {
    yield takeLatest('EMAIL_SIGN_IN_START', emailSignInSaga);
}

function* onCheckUserSession() {
    yield takeLatest('CHECK_USER_SESSION', isUserAuthenticatedSaga);
}

function* onSignOut() {
    yield takeLatest('SIGN_OUT_START', signOutSaga);
}

function* onRegister() {
    yield takeLatest('REGISTER_USER_START', registerUserSaga);
}

function* onRegisterSuccess() {
    yield takeLatest('REGISTER_USER_SUCCESS', signInAfterRegister);
}

function* onFetchOrders() {
    yield takeLatest('FETCH_ORDERS_START', fetchOrdersSaga);
}

function* onSaveFavorite() {
    yield takeLatest('SAVE_FAVORITE', saveFavoriteSaga);
}

function* onRemoveFavorite() {
    yield takeLatest('REMOVE_FAVORITE', removeFavoriteSaga);
}

function* onFetchFavorites() {
    yield takeLatest('FETCH_FAVORITES_START', fetchFavoritesSaga);
}

export function* userSagas() {
    yield all([
        call(onGoogleSignIn),
        call(onEmailSignIn),
        call (onCheckUserSession),
        call(onSignOut),
        call(onRegister),
        call(onRegisterSuccess),
        call(onFetchOrders),
        call(onSaveFavorite),
        call(onRemoveFavorite),
        call(onFetchFavorites)
    ]);
}