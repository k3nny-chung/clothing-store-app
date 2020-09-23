import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import LoginAndRegisterPage from './pages/login-and-register/login-and-register.component';
import CheckOutPage from './pages/checkout/checkout.component';
//import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser, checkUserSession } from './redux/user/user.actions';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.authUnsubscribe = null;
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
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/login" render={() => this.props.user ? <Redirect to='/' /> :  <LoginAndRegisterPage />} />
          <Route exact path="/checkout" component={CheckOutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
