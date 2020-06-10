import React from 'react';
import './login.styles.scss';
import FormInput from '../form-input/form-input.component';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.log('Error signing in with email and password', error.message);
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.onSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        label="email"
                        value={this.state.email}
                        handleChange={this.onChange}
                        required />
                     <FormInput 
                        name="password" 
                        type="password" 
                        label="password"
                        value={this.state.password}
                        handleChange={this.onChange}
                        required />
                    <div className="buttons">
                        <button type="submit">Sign In</button>
                        <button type="button" className="googleSignIn" onClick={signInWithGoogle}>Sign in with Google</button>
                    </div>                    
                </form>
            </div>
        )
    }
}