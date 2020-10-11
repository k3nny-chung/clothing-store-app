const INITIAL_STATE = {
    currentUser: null,
    error: null,
    orders: [],
};  

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER': 
            return {
                ...state,
                currentUser: action.payload
            };
        case 'SIGN_IN_SUCCESS':
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };
        case 'SIGN_OUT_SUCCESS':
            return {
                ...state,
                currentUser: null,
                error: null
            };
        case 'SIGN_IN_FAILURE':
        case 'SIGN_OUT_FAILURE':
        case 'REGISTER_USER_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        case 'FETCH_ORDERS_SUCCESS':
            return {
                ...state,
                orders: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;