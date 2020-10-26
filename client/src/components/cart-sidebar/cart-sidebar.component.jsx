import React from 'react';
import './cart-sidebar.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { withRouter } from 'react-router-dom';
import { toggleCartDropdown, hideCart } from '../../redux/cart/cart.actions';
import { useRef, useEffect } from 'react';

const CartSideBar = ({ cartItems, history, isCartHidden, hideCart }) => {

    const node = useRef();

    const handleClick = (event) => {
        // On click outside of the cart, close the cart
        if (!node.current.contains(event.target)) {
            hideCart();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => { document.removeEventListener('mousedown', handleClick) };
    }, []);
    
    return (    
        <div ref={node} className={`cart-sidebar ${isCartHidden ? 'hide' : 'show'}`} >
            <div className="cart-header">
                <h2 className="title">Your Cart</h2>
                <button type="button" className="close-button" onClick={() => hideCart()} >
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
                            hideCart();
                        }} >
                        Go to checkout
                    </button>
                </div>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
    isCartHidden: state.cart.cartDropdownHidden
});

const mapDispatchToProps = (dispatch) => ({
    hideCart: () => dispatch(hideCart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartSideBar));