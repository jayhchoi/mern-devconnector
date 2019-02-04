import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import './App.css';

import PrivateRoute from './components/PrivateRoute';
import { Navbar, Footer, Landing } from './components/layouts';
import { Register, Login } from './components/auth/';
import { Dashboard } from './components/dashboard';

class App extends Component {
  componentWillMount() {
    // Check for local token when refreshed AND keep user logged in
    if (localStorage.jwt) {
      const token = localStorage.jwt;
      setAuthToken(token);
      const decoded = jwtDecode(token);

      this.props.setCurrentUser(decoded);

      // Logout user when token expires
      if (decoded.exp < Date.now() / 1000) {
        this.props.logoutUser();
        window.location.href = '/login'; // Traditional a tag href
      }
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/login" render={() => <Login />} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
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
