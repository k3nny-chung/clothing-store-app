import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import CheckOutPage from './pages/checkout/checkout.component';
//import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser, checkUserSession } from './redux/user/user.actions';
import LoginPage from './pages/login/login-page.component';
import RegisterPage from './pages/register/register-page.component';
import UserAccountPage from './pages/user-account/user-account-page.component';
import CartSidebar from './components/cart-sidebar/cart-sidebar.component';
import OrderConfirmation from './pages/order-confirmation/order-confirmation-page.component';
import SearchPage from './pages/search/search-page.component';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    //this.authUnsubscribe = null;
  }

  componentDidMount() {
    this.props.checkUserSession();
    // this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot => {
    //       this.props.setCurrentUser({             
    //           id: snapShot.id, 
    //           ...snapShot.data() 
    //       });
    //     });
    //   }

    //   this.props.setCurrentUser(null);
    // });
  }

  componentWillUnmount() {
    //this.authUnsubscribe();
  }
  
  render() {
    if (!this.props.hideCartDropdown) {
      // when showing the cart, don't allow scrolling on the main content
      document.body.classList.add('noscroll');
    } else {
      document.body.classList.remove('noscroll');
    }

    return (
      <div>
        { !this.props.hideCartDropdown && <div className="overlay"></div> }
        <Header />
        <div className="main-content">
          <div className={`main-page ${this.props.hideCartDropdown ? 'hideCart' : 'showCart'}`} >
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/shop" component={ShopPage} />
              <Route exact path="/checkout" component={CheckOutPage} />
              <Route exact path="/signin" render={() => this.props.user ? <Redirect to='/' /> :  <LoginPage />} />
              <Route exact path="/register" render={() => this.props.user ? <Redirect to='/' /> : <RegisterPage /> } /> 
              <Route exact path="/account" render={() => this.props.user ? <UserAccountPage /> : <Redirect to='/' /> } />          
              <Route exact path="/order-confirmation" component={OrderConfirmation} />
              <Route exact path="/search" component={SearchPage} />
             </Switch>
          </div>
          <CartSidebar />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  hideCartDropdown: state.cart.cartDropdownHidden
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
