import React from 'react';
import './user-profile.styles.scss';

const UserProfile = ({ user }) => {
    if (user) {
        return (
            <div className="user-profile">
                <div className="name">{user.displayName}</div>
                <div className="email">{user.email}</div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default UserProfile;