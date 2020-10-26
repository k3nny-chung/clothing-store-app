import React from 'react';
import './order-item.styles.scss';
import moment from 'moment';

const Order = ({ order }) => { 
    const { created, id, items, amount } = order;
    const orderDate = moment(created);
    const numItems = items.reduce(((total, current) => current.quantity + total), 0);
    return (
    <div className="order">
        <div className="order-info">
            <div className="date">Date Placed: {orderDate.format('MMMM D YYYY, h:mm a')} </div>  
            <div className="order-id">Order ID: {id} </div>
            <div className="total">Order Total: ${amount} ({`${numItems} ${numItems > 1 ? 'items': 'item'}`}) </div>
        </div>
        <div className="order-items">
            { 
                items.map( item => 
                <div className="order-item" key={item.id}>
                    <img src={item.imageUrl} alt="item" />
                    <div className="item-details">  
                        <span className="name">{item.name}</span>    
                        <span className="price">Price: ${item.price}</span>
                        <span className="quantity">Quantity: {item.quantity}</span>
                    </div>
                </div>
                )
            }
        </div>
    </div>
)};

export default Order;