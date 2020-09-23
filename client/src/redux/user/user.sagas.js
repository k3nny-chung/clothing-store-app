import { auth, googleAuthProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, registerSuccess, registerFailure } from "./user.actions";

function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
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

function* registerUserSaga({ payload: { email, password, displayName } }) {
    try {
        const userCred = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(registerSuccess({
            user: userCred.user,
            additionalData: { displayName }
        }));
    } catch (error) {
        yield put(registerFailure(error));
    }
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

export function* userSagas() {
    yield all([
        call(onGoogleSignIn),
        call(onEmailSignIn),
        call (onCheckUserSession),
        call(onSignOut),
        call(onRegister),
        call(onRegisterSuccess)
    ]);
}