import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../utils/history';

const Profile = ({ profile }) => {
  const { pathname } = history.location;

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img src={profile.user.avatar} alt="" className="rounded-circle" />
        </div>
        <div className="col-lg-6 col-md-6 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status} <span>at {profile.company}</span>
          </p>
          <p>{!profile.location ? null : <span>{profile.location}</span>}</p>
          <Link
            to={{
              pathname: `/profile/${profile.handle}`,
              state: { from: { pathname } }
            }}
            className="btn btn-info"
          >
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {profile.skills.slice(0, 4).map((skill, index) => {
              return (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" /> {skill}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;
