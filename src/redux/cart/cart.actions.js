export const toggleCartDropdown = () => ({
    type: 'TOGGLE_CART_DROPDOWN'
});

export const addItem = (item) => ({
    type: 'ADD_CART_ITEM',
    payload: item
});

export const clearItem = (item) => ({
    type: 'CLEAR_CART_ITEM',
    payload: item
});

export const removeItem = (item) => ({
    type: 'REMOVE_CART_ITEM',
    payload: item
});