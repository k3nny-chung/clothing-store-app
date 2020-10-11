import React from 'react';
import './cart-item.styles.scss';
import removeIcon from '../../assets/delete-24px.svg';
import { connect } from 'react-redux';
import { clearItem } from '../../redux/cart/cart.actions';

const CartItem = ({ item, removeFromCart }) => {
    const { name, price, imageUrl, quantity } = item;
    return (
    <div className="cart-item">
        <img src={imageUrl} alt="item" />
        <div className="item-details">
            <span className="name">{name}</span>    
            <span className="price">{quantity} x ${price}</span>
            <div className='remove-button' onClick={() => removeFromCart(item)}>
                <img src={removeIcon} alt="remove from cart" title="remove from cart" className="remove-icon"/>
                <span>Remove</span>
            </div>
        </div>
    </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (cartItem) => dispatch(clearItem(cartItem))
});

export default connect(null, mapDispatchToProps)(CartItem);