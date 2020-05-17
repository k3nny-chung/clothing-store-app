import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import LoginAndRegisterPage from './pages/login-and-register/login-and-register.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {
  
  constructor() {
    super();
    this.state = {
      user: null
    }

    this.authUnsubscribe = null;
  }

  componentDidMount() {
    this.authUnsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            user: { 
              id: snapShot.id, 
              ...snapShot.data() }
          });
        });
      }

      this.setState({ user: null });
    });
  }

  componentWillUnmount() {
    this.authUnsubscribe();
  }
  
  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/login" component={LoginAndRegisterPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
