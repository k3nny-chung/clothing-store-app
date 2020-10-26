const INITIAL_STATE = {
    currentUser: null,
    error: null,
    orders: [],
    favorites: [],
    isFetchingOrders: false,
    isFetchingFavorites: false
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
                error: null,
                orders: [],
                favorites: []
            };
        case 'SIGN_OUT_SUCCESS':
            return {
                ...state,
                ...INITIAL_STATE
            };
        case 'SIGN_IN_FAILURE':
        case 'SIGN_OUT_FAILURE':
        case 'REGISTER_USER_FAILURE':
            return {
                ...state,
                error: action.payload
            };
        case 'FETCH_ORDERS_START':
            return {
                ...state,
                isFetchingOrders: true
            }
        case 'FETCH_ORDERS_SUCCESS':
            return {
                ...state,
                orders: action.payload,
                isFetchingOrders: false
            };
        case 'FETCH_ORDERS_FAILURE':
            return {
                ...state,
                isFetchingOrders: false
            }
        case 'FETCH_FAVORITES_START':
            return {
                ...state,
                isFetchingFavorites: true
            }
        case 'FETCH_FAVORITES_SUCCESS':
            return {
                ...state,
                favorites: [...action.payload],
                isFetchingFavorites: false
            };
        case 'FETCH_FAVORITES_FAILURE':
            return {
                ...state,
                isFetchingFavorites: false
            }
        case 'SAVE_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload.itemId]
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter(f => f !== action.payload.itemId)
            };
        default:
            return state;
    }
};

export default userReducer;