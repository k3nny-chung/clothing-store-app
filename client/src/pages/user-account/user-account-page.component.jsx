import React from 'react';
import './user-account-page.styles.scss';
import UserProfile from '../../components/user-profile/user-profile.component';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersStart } from '../../redux/user/user.actions';
import Orders from '../../components/orders/orders.component';

const UserAccountPage = ({ dispatch, user, orders }) => {
    useEffect(() => {
        if (user) {
            dispatch(fetchOrdersStart(user.id));   
        }
             
    }, [user]);

    return (
    <div className="user-account-page">
        <UserProfile user={user} />
        <Orders orders={orders} />
    </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user.currentUser,
    orders: state.user.orders
});

export default connect(mapStateToProps)(UserAccountPage);