import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({
  component: Component, // receive component prop and call it Component
  auth,
  redirect = '/login',
  ...rest
}) => {
  return (
    <Route
      {...rest} // path, exact, ...
      render={props =>
        auth.isAuthenticated === true ? (
          <Component {...props} /> // props passed into the component
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(PrivateRoute);
