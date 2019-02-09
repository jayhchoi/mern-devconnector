// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// OTHER LIBRARIES
import jwtDecode from 'jwt-decode';

// UTILS
import { history, setAuthToken } from './utils';

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
  CreateProfile,
  EditProfile,
  AddExperience,
  AddEducation,
  Profiles,
  ProfileDetail
} from './containers';

class App extends Component {
  componentWillMount() {
    // Check for local token when refreshed AND keep user logged in
    console.log('Getting auth info from local storage...');
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
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:handle" component={ProfileDetail} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <Footer />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired
  // auth: PropTypes.object.isRequired
};

// const mapStateToProps = state => {
//   return {
//     auth: state.auth
//   };
// };

export default connect(
  null,
  {
    logoutUser,
    setCurrentUser
  }
)(App);
