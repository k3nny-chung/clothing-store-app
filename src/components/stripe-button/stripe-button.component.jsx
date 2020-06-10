import React from 'react';
import './stripe-button.styles.scss';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/KC_Logo.001.png';

const StripeCheckoutButton = ({ price }) => {
    const priceInCents = price * 100;
    const publishKey = 'pk_test_51Gql5bARL1ttheenqYNVV5OYaDMhAQUARkPnEdoHuMAnkbufMq70wLY67j0t8q2A4elkmLr5tVlEgYtnNrHL40n800KV7WuiXx';

    const onToken = (token) => {
        console.log(token);
        alert('Payment successful');
    }

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