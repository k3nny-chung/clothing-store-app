import React from 'react';
import './cart-sidebar.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { withRouter } from 'react-router-dom';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';

const CartSideBar = ({ cartItems, history, toggleCartDropdown, hideCartDropdown }) => (
    
        <div className={`cart-sidebar ${hideCartDropdown ? 'hide' : 'show'}`} >
            <div className="cart-header">
                <h2 className="title">Your Cart</h2>
                <button type="button" className="close-button" onClick={() => toggleCartDropdown()} >
                    &#10005;
                </button>
            </div>
            {cartItems.length === 0 && <span>No items in cart</span>}
            {cartItems.length > 0 &&
                <div>
                    <div className="cart-items">
                        {cartItems.map(item => <CartItem key={item.id} item={item} />)}
                    </div>
                    <button
                        type="button"
                        className="check-out-button round"
                        onClick={() => {
                            history.push('/checkout');
                            toggleCartDropdown();
                        }} >
                        Go to checkout
                    </button>
                </div>
            }
        </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
    hideCartDropdown: state.cart.cartDropdownHidden
});

const mapDispatchToProps = (dispatch) => ({
    toggleCartDropdown: () => dispatch(toggleCartDropdown())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartSideBar));