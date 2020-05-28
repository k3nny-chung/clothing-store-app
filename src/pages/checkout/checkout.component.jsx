import React from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const CheckOutPage = ({ cartItems, cartTotal }) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">Product</div>
            <div className="header-block">Description</div>
            <div className="header-block">Quantity</div>
            <div className="header-block">Price</div>
            <div className="header-block">Remove</div>
        </div>
        { cartItems.map(item => <CheckoutItem key={item.id} cartItem={item} />) }
        <div className="total">TOTAL: ${cartTotal}</div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartTotal: selectCartTotal
});

export default connect(mapStateToProps)(CheckOutPage);