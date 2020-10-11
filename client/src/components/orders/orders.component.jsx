import React from 'react';
import './orders.styles.scss';
import Order from '../order-item/order-item.component';
import { connect } from 'react-redux';

const Orders = ({ orders }) => (
    <div className="user-orders">
        <h2>ORDER HISTORY</h2>
        { orders.length === 0 && <span>No orders placed yet.</span>}
        { orders.map(order => <Order key={order.id} order={order} />) }
    </div>
) ;

export default Orders;