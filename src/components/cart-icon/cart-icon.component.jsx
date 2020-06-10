import React from 'react';
import './cart-icon.styles.scss';
import basketIcon from '../../assets/basket.svg';
import { connect } from 'react-redux';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartDropdown, cartTotalItems }) => (
    <div className="cart-icon" onClick={() => toggleCartDropdown()} >
        <img src={basketIcon} alt="cart" className="shopping-icon"/>
        <span className="item-count">{ cartTotalItems > 0 && cartTotalItems }</span>
    </div>
);

const mapStateToProps = (state) => ({
    cartTotalItems: selectCartItemsCount(state)
});

const mapDispatchToProps = (dispatch) => ({
    toggleCartDropdown: () => dispatch(toggleCartDropdown())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

