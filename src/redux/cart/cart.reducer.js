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

const removeFromCart = (cartItems, itemToRemove) => {
    const itemIndex = cartItems.findIndex(item => item.id === itemToRemove.id);
    if (itemIndex < 0) {
        return cartItems;
    }

    const existingItem = { 
        ...itemToRemove, 
        quantity: itemToRemove.quantity - 1 
    };

    if (existingItem.quantity === 0) {
        return [
            ...cartItems.slice(0, itemIndex), 
            ...cartItems.slice(itemIndex + 1)
        ];
    } else {
        return [
            ...cartItems.slice(0, itemIndex),
            existingItem,
            ...cartItems.slice(itemIndex + 1) 
        ];
    }
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
        case 'CLEAR_CART_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
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