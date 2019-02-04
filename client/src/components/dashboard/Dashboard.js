import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getCurrentProfile } from '../../actions/profilesActions';
import Spinner from '../layouts/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  renderContent() {
    const { user } = this.props.auth;
    const { profile } = this.props;

    if (profile === null) {
      return <Spinner />;
    } else {
      if (_.isEmpty(profile)) {
        return (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You've not set up your profile yet. Please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      } else {
      }
    }
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profiles
  };
};

export default connect(
  mapStateToProps,
  {
    getCurrentProfile
  }
)(Dashboard);
