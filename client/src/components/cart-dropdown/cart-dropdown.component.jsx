import React from 'react';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { withRouter } from 'react-router-dom';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            { cartItems.map(item => <CartItem key={item.id} item={item} />) }
        </div>
        <button 
            type="button" 
            className="check-out-button" 
            onClick={() => { 
                history.push('/checkout');
                dispatch(toggleCartDropdown());
                }} >
                Go to checkout
        </button>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));