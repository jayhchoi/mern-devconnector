// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// OTHER LIBRARIES

// UTILS
import { history } from './utils';

// ACTIONS
import { logoutUser, setCurrentUser } from './actions/auth.action';

// STYLES
import './App.css';

// COMPONENTS
import { Navbar, Footer, PrivateRoute } from './components';

// CONTAINERS
import {
  Login,
  Register,
  Dashboard,
  Landing,
  CreateProfile
} from './containers';

class App extends Component {
  // componentWillMount() {
  //   // Check for local token when refreshed AND keep user logged in
  //   if (localStorage.jwt) {
  //     const token = localStorage.jwt;
  //     setAuthToken(token);
  //     const decoded = jwtDecode(token);

  //     this.props.setCurrentUser(decoded);

  //     // Logout user when token expires
  //     if (decoded.exp < Date.now() / 1000) {
  //       this.props.logoutUser();
  //       window.location.href = '/login'; // Traditional a tag href
  //     }
  //   }
  // }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/register"
            render={props => <Register {...props} />}
          />
          <Route exact path="/login" render={props => <Login {...props} />} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    logoutUser,
    setCurrentUser
  }
)(App);
