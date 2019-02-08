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
    const { profiles } = this.props;

    if (_.isEmpty(profiles) || profiles === null) {
      return <Spinner />;
    } else {
      return profiles.map(profile => (
        <Profile key={profile._id} profile={profile} />
      ));
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
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    profiles: Object.values(state.profiles)
  };
};

export default connect(
  mapStateToProps,
  {
    getProfiles
  }
)(Profiles);
