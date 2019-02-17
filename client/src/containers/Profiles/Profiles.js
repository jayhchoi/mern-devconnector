import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Spinner } from '../../components';
import { getProfiles } from '../../actions/profiles.action';
import Profile from './Profile';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  renderContent() {
    let { profiles, isFetching } = this.props.profile;

    // convert object to array
    profiles = Object.values(profiles);

    if (isFetching) {
      return <Spinner />;
    } else {
      if (_.isEmpty(profiles)) {
        return <p className="lead">There's no profile</p>;
      } else {
        return (
          <div className="row">
            {profiles.map(profile => (
              <Profile key={profile._id} profile={profile} />
            ))}
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  {
    getProfiles
  }
)(Profiles);
