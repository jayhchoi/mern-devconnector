import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/auth.action';

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container">
          <span data-toggle="collapse" data-target="#mobile-nav.show">
            <Link className="navbar-brand" to="/">
              DevConnector
            </Link>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li
                className="nav-item"
                data-toggle="collapse"
                data-target="#mobile-nav"
              >
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Developers
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              {isAuthenticated ? (
                <Fragment>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/feed">
                      Post Feed
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <a
                      href="/"
                      className="nav-link"
                      onClick={this.props.logoutUser}
                    >
                      <img
                        className="rounded-circle"
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: '25px', marginRight: '5px' }}
                        title="You must have a gravatar connected to your email to show your profile picture"
                      />
                      Logout
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                  >
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser
  }
)(Navbar);
