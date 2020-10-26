import React from 'react';
import './login.styles.scss';
import FormInput from '../form-input/form-input.component';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { Link, useLocation, useHistory, withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { emailSignIn, location, history } = this.props;
        try {
            emailSignIn(this.state.email, this.state.password); 
           
            const { from } = location.state || { from: '/' };
            history.replace({ pathname: from, state: location.state || null });
                   
        } catch (error) {
            console.log('Error signing in with email and password', error.message);
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { googleSignIn, loginError } = this.props;
        
        return (
            <div className="sign-in">
                <h2>LOG INTO KC STORE</h2>
                <span>Sign in with your email and password</span> 
                <span>Don't have an account? <Link className="create-account-link" to="/register">Create an account</Link></span>
                
                { loginError && <div className="error-message">Wrong email or password</div> }
                
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
                        <button type="submit" 
                                className="round" 
                                disabled={this.state.email === '' || this.state.password === ''}>
                            Log In
                        </button>
                        <button type="button" className="round googleSignIn" onClick={googleSignIn}>
                            <span className="signin-google-icon"></span>
                            <span className="signin-google-text">Log in with Google</span>
                        </button>
                    </div>                    
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginError: state.user.error
});

const mapDispatchToProps = (dispatch) => ({
    googleSignIn: () => dispatch(googleSignInStart()),
    emailSignIn: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));