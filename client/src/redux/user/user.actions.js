export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user
});

export const googleSignInStart = () => ({
    type: 'GOOGLE_SIGN_IN_START'
});

export const emailSignInStart = (emailAndPassword) => ({
    type: 'EMAIL_SIGN_IN_START',
    payload: emailAndPassword
});

export const signInSuccess = (user) => ({
    type: 'SIGN_IN_SUCCESS',
    payload: user
});

export const signInFailure = (error) => ({
    type: 'SIGN_IN_FAILURE',
    payload: error
});

export const signOutStart = () => ({
    type: 'SIGN_OUT_START'
});

export const signOutSuccess = () => ({
    type: 'SIGN_OUT_SUCCESS'
});

export const signOutFailure = (error) => ({
    type: 'SIGN_OUT_FAILURE',
    payload: error
});

export const checkUserSession = () => ({
    type: 'CHECK_USER_SESSION'
});

export const registerStart = (userInfo) => ({
    type: 'REGISTER_USER_START',
    payload: userInfo
});

export const registerSuccess = ({ user, additionalData }) => ({
    type: 'REGISTER_USER_SUCCESS',
    payload: { user, additionalData }
});

export const registerFailure = (error) => ({
    type: 'REGISTER_USER_FAILURE',
    payload: error
});

export const fetchOrdersStart = (userId) => ({
    type: 'FETCH_ORDERS_START',
    payload: userId
});

export const fetchOrdersSuccess = (orders) => ({
    type: 'FETCH_ORDERS_SUCCESS',
    payload: orders
});

export const fetchOrdersFailure = (error) => ({
    type: 'FETCH_ORDERS_FAILURE',
    payload: error
});

