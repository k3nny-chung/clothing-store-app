import React from 'react';
import './login-and-register.styles.scss';
import Login from '../../components/login/login.component';
import SignUp from '../../components/sign-up/sign-up.component';

const LoginAndRegisterPage = () => (
    <div className="sign-in-and-sign-up">
        <Login />
        <SignUp />
    </div>
)

export default LoginAndRegisterPage;