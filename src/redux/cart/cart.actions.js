export const toggleCartDropdown = () => ({
    type: 'TOGGLE_CART_DROPDOWN'
});

export const addItem = (item) => ({
    type: 'ADD_CART_ITEM',
    payload: item
});

export const removeItem = (itemID) => ({
    type: 'REMOVE_CART_ITEM',
    payload: itemID
});