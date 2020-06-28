//import SHOP_DATA from "./shop.data";

const INITIAL_STATE = {
    collections:  null //SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'UPDATE_SHOP_DATA') {
        return {
            ...state,
            collections: action.payload
        }
    }
    return state;
}

export default shopReducer;