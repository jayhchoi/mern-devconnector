import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../utils/history';

const Profile = ({ profile }) => {
  const { pathname } = history.location;

  return (
    <div className="col-md-4 col-sm-6 profile mb-2">
      <div className="card">
        <img
          src="https://source.unsplash.com/random"
          className="card-img-top"
          alt="..."
        />
        <img
          src={profile.user.avatar}
          className="rounded-circle round-avatar"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{profile.user.name}</h5>
          <p className="card-text">
            {profile.status} <span>at {profile.company}</span> <br />
            {!profile.location ? null : <span>{profile.location}</span>} <br />
          </p>
          <hr />
          <h6>Skill Set</h6>
          {profile.skills.slice(0, 4).map((skill, index) => {
            return (
              <span key={index} className="badge badge-primary text-white mr-1">
                {skill}
              </span>
            );
          })}
          <Link
            to={{
              pathname: `/profile/${profile.handle}`,
              state: { from: { pathname } }
            }}
            className="btn btn-info btn-block mt-2"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;
