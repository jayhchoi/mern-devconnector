import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  getCurrentProfile,
  deleteAccount,
  deleteExperience,
  deleteEducation
} from '../../actions/profiles.action';
import { Spinner, Experience, Education } from '../../components';
import history from '../../utils/history';

import ProfileButtons from './ProfileButtons';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDelete = () => {
    this.props.deleteAccount(history);
  };

  renderContent() {
    const { user } = this.props.auth;
    const { profiles, isFetching } = this.props.profile;
    const profile = Object.values(profiles)[0];

    if (isFetching) {
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
        return (
          <div>
            <p className="lead text-muted">
              Welcome{' '}
              <Link
                to={{
                  pathname: `/profile/${profile.handle}`,
                  state: { from: this.props.location }
                }}
              >
                {user.name}
              </Link>
            </p>
            <ProfileButtons />
            <Experience
              experience={profile.experience}
              onDeleteClick={this.props.deleteExperience}
            />
            <Education
              education={profile.education}
              onDeleteClick={this.props.deleteEducation}
            />
            <button
              onClick={this.onDelete}
              className="d-block btn btn-danger mt-3"
            >
              Delete my account
            </button>
          </div>
        );
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
  deleteAccount: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile // Getting a single profile from profilesReducer
  };
};

export default connect(
  mapStateToProps,
  {
    getCurrentProfile,
    deleteAccount,
    deleteExperience,
    deleteEducation
  }
)(Dashboard);
