import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import './header.styles.scss';
import logo from '../../assets/KC_Logo.001.png';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ user, hideCartDropdown }) => (
    
    <div className="header">
        <Link className="logo-container" to="/">
            <img src={logo} style={{ height: '95%' }} alt="logo"></img>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/contact">CONTACT</Link>
            { !user && <Link className="option" to="/login">SIGN IN</Link> }
            { user && <div className="option" onClick={() => auth.signOut()} >SIGN OUT</div>}
            <CartIcon className="option"></CartIcon>
        </div>
        { !hideCartDropdown && <CartDropdown /> }
    </div>
);

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    hideCartDropdown: state.cart.cartDropdownHidden
});

export default connect(mapStateToProps)(Header);