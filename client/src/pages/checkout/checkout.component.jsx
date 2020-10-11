import React, { useState } from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CheckOutPageContent = ({ cartItems, cartTotal, user, setIsTxnProcessing }) => (
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
        <p className="note">* Use the test credit card number 4242 4242 4242 4242 with any future expiry date and any random CVC</p>
        { cartTotal > 0 && <StripeCheckoutButton price={cartTotal} items={cartItems} user={user} setIsTxnProcessing={setIsTxnProcessing} /> }
    </div>
);

const CheckOutPageWithSpinner = WithSpinner(CheckOutPageContent);

const CheckOutPage = ({ cartItems, cartTotal, user }) => {
    const [isTxnProcessing, setIsTxnProcessing] = useState(false);

    return <CheckOutPageWithSpinner 
                cartItems={cartItems} 
                cartTotal={cartTotal} 
                user={user} 
                setIsTxnProcessing={setIsTxnProcessing} 
                isLoading={isTxnProcessing} />
}


const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state),
    cartTotal: selectCartTotal(state),
    user: state.user.currentUser
});

export default connect(mapStateToProps)(CheckOutPage);