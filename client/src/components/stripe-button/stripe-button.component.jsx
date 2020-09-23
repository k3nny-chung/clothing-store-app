import React from 'react';
import './stripe-button.styles.scss';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/KC_Logo.001.png';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceInCents = price * 100;
    const publishKey = 'pk_test_51GqkzPDSu34YXCaRRFxLWlPIEDa5wcip8X3pIajTc0SBzmliMzob9wKcURp0LcDc6SkgVHcTTicMoKOoqzIDaSTM00Wf6wezMJ';

    const onToken = (token) => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceInCents,
                token: token
            }   
        }).then(response => {
            alert('successful payment');
        }).catch(error => {
            console.log('Payment error', error);
            alert('There was an issue with your payment. Please make sure you use the provided credit card');
        });    
    };

    return (
        <StripeCheckout 
            label="Pay Now"
            name="KC Clothing Store"
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

export default StripeCheckoutButton;