import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import { removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem: { id, name, imageUrl, price, quantity }, dispatch }) => (
    <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt="item" />
        </div>
        <span className="name">{ name }</span>
        <span className="quantity">{ quantity }</span>
        <span className="price">{ price }</span>
        <div className='remove-button' onClick={() => dispatch(removeItem(id))}>&#10005;</div>
    </div>
);

export default connect()(CheckoutItem);