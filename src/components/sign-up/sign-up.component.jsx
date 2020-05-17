import React from 'react';
import './sign-up.styles.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { email, password, displayName } = this.state;
            const userCred = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(userCred.user, { displayName });
            this.setState({
                email: '',
                password: '',
                displayName: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.log('Error signing up user', error.message);
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        label="Display Name"
                        onChange={this.handleChange}
                        required />
                    <FormInput 
                        type="email"
                        name="email"
                        value={this.state.email}
                        label="Email"
                        onChange={this.handleChange}
                        required />
                    <FormInput 
                        type="password"
                        name="password"
                        value={this.state.password}
                        label="Password"
                        onChange={this.handleChange}
                        required />
                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        label="Confirm Password"
                        onChange={this.handleChange}
                        required />
                    <button type="submit">Sign up</button>
                </form>
            </div>
        )
    }
}