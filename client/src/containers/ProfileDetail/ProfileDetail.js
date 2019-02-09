import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Spinner } from '../../components';
import { getProfileByHandle } from '../../actions/profiles.action';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCredentials from './ProfileCredentials';
import ProfileGithub from './ProfileGithub';

class ProfileDetail extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  renderContent() {
    const { profile } = this.props;

    if (!profile) {
      return <Spinner />;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredentials
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="profile-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileDetail.PropTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: Object.values(state.profiles)[0]
  };
};

export default connect(
  mapStateToProps,
  {
    getProfileByHandle
  }
)(ProfileDetail);
