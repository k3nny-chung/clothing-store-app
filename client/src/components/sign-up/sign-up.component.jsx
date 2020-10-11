import React from 'react';
import './sign-up.styles.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import { connect } from 'react-redux';
import { registerStart } from '../../redux/user/user.actions';
import FormSelect from '../form-select/form-select.component';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const { email, password, displayName, gender } = this.state;
            this.props.dispatch(registerStart({ email, password, displayName, gender }));
            // const userCred = await auth.createUserWithEmailAndPassword(email, password);
            // await createUserProfileDocument(userCred.user, { displayName });
            
        } catch (error) {
            console.log('Error signing up user', error.message);
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { registerError } = this.props;
        return (
            <div className="sign-up">
                <h2 className="title">CREATE AN ACCOUNT</h2>
                <span>Sign up with your email address</span>
                <span>Already registered? <Link className="login-link" to="/signin">Sign into your account</Link></span>

                { registerError && <div className="error-message">{registerError.message}</div> }

                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text"
                        name="displayName"
                        value={this.state.displayName}
                        label="Name"
                        onChange={this.handleChange}
                        required />
                    <FormSelect 
                        name="gender"
                        value={this.state.gender}
                        label="Gender"
                        options={[
                            { value: 'M', text: 'Male' },
                            { value: 'F', text: 'Female' },
                            { value: 'O', text: 'Other' }
                        ]}
                        onChange={this.handleChange} />
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
                    <button className="round" type="submit">Create Account</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    registerError: state.user.error
});

export default connect(mapStateToProps, null)(SignUp);