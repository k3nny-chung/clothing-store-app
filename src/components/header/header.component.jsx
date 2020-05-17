import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import './header.styles.scss';
import logo from '../../assets/KC_Logo.001.png';

const Header = ({ user }) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <img src={logo} style={{ height: '95%' }} alt="logo"></img>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/contact">CONTACT</Link>
            { !user && <Link className="option" to="/login">SIGN IN</Link> }
            { user && <div className="option" onClick={() => auth.signOut()} >SIGN OUT</div>}
        </div>
    </div>
);

export default Header;