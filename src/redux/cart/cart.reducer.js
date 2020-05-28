const INITIAL_STATE = {
    cartDropdownHidden : true,
    cartItems: []
};

const addToCart = (cartItems, itemToAdd) => {
    const existingItem = cartItems.find(item => item.id === itemToAdd.id);
    if (existingItem) {
        return cartItems.map(item => {
            if (item === existingItem) {
                return { ...existingItem, quantity: existingItem.quantity + 1 }
            }

            return item;
        });
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

const removeFromCart = (cartItems, itemID) => {
    return cartItems.filter(item => item.id !== itemID);
}


const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_CART_DROPDOWN':
            return {
                ...state,
                cartDropdownHidden: !state.cartDropdownHidden
            }
        case 'ADD_CART_ITEM':
            return {
                ...state,
                cartItems: addToCart(state.cartItems, action.payload)
            }
        case 'REMOVE_CART_ITEM':
            return {
                ...state,
                cartItems: removeFromCart(state.cartItems, action.payload)
            }    
        default:
            return state;
    }
};

export default cartReducer;