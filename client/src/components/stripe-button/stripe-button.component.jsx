import React from 'react';
import './stripe-button.styles.scss';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/KC_Logo.001.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, items, user, history, dispatch, setIsTxnProcessing }) => {
    const priceInCents = price * 100;
    const publishKey = 'pk_test_51GqkzPDSu34YXCaRRFxLWlPIEDa5wcip8X3pIajTc0SBzmliMzob9wKcURp0LcDc6SkgVHcTTicMoKOoqzIDaSTM00Wf6wezMJ';

    const onToken = (token) => {
        setIsTxnProcessing(true);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceInCents,
                items,
                userID: user ? user.id : null,
                token
            }   
        }).then(response => {
            dispatch(clearCart());
            history.push({
                pathname: '/order-confirmation',
                state: {
                    order: response.data.order
                }
            });
        }).catch(error => {
            console.log('Payment error', error);
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        }).finally(() => setIsTxnProcessing(false));    
    };

    return (
        <StripeCheckout 
            label="Pay Now"
            name="KC Clothing Store"
            email={user? user.email : ''}
            billingAddress
            shippingAddress
            image={logo}
            description={ `Your total is ${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishKey} />

    );
};

export default withRouter(connect()(StripeCheckoutButton));