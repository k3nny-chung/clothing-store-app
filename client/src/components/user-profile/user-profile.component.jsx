import React from 'react';
import './user-profile.styles.scss';
import { useRouteMatch, Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
    const { url } = useRouteMatch();

    if (user) {
        return (
            <div className="user-profile">
                <div className="name">{user.displayName}</div>
                <div className="email">{user.email}</div>
                <div className="options">
                    <Link className="option" to={`${url}/orders`}>Order History</Link>
                    <Link className="option" to={`${url}/favorites`}>Favorites</Link>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default UserProfile;