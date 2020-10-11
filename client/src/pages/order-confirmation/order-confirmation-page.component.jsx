import React from 'react';
import './order-confirmation-page.styles.scss';
import { withRouter } from 'react-router-dom';
import Order from '../../components/order-item/order-item.component';

const OrderConfirmation = ({ location, history }) => {
    if (!location.state || !location.state.order) {
        history.push('/');
        return (<div></div>);
    }

    const order = location.state.order;
    return (
        <div className="order-confirmation">
            <h2> Thank you for your order!</h2>
            <Order order={order} />
        </div>
    )
};

export default withRouter(OrderConfirmation);

