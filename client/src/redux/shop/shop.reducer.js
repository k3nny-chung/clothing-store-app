//import SHOP_DATA from "./shop.data";

const INITIAL_STATE = {
    collections:  null, //SHOP_DATA
    isFetching: false,
    error: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_SHOP_DATA_START':
            return {
                ...state,
                isFetching: true
            };
        case 'FETCH_SHOP_DATA_SUCCESS':
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            };
        case 'FETCH_SHOP_DATA_ERROR':
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default shopReducer;