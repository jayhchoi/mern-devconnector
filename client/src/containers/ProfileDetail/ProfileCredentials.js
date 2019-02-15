import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProfileCredentials = ({ experience, education }) => {
  const experiences = experience.map(exp => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="MMM YYYY">{exp.from}</Moment> -{' '}
        {exp.to ? <Moment format="MMM YYYY">{exp.to}</Moment> : 'Now'}
      </p>
      <p>
        <strong>Position:</strong> {exp.title}
      </p>
      {exp.location ? (
        <p>
          <strong>Location:</strong> {exp.location}
        </p>
      ) : null}
      {exp.description ? (
        <p>
          <strong>Description:</strong> {exp.description}
        </p>
      ) : null}
    </li>
  ));

  const educations = education.map(edu => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="MMM YYYY">{edu.from}</Moment> -{' '}
        {edu.to ? <Moment format="MMM YYYY">{edu.to}</Moment> : 'Now'}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {edu.fieldofstudy}
      </p>

      {edu.description ? (
        <p>
          <strong>Description:</strong> {edu.description}
        </p>
      ) : null}
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6 mt-2">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {experiences.length > 0 ? (
            experiences
          ) : (
            <div
              style={{ border: 'solid rgba(0,0,0,.125) 1px', height: '100%' }}
            >
              <Link to="/add-experience" className="my-5 d-block">
                <p className="text-center">Click to add experience</p>
              </Link>
            </div>
          )}
        </ul>
      </div>
      <div className="col-md-6 mt-2">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
          {educations.length > 0 ? (
            educations
          ) : (
            <div style={{ border: 'solid rgba(0,0,0,.125) 1px' }}>
              <Link to="/add-education" className="my-5 d-block">
                <p className="text-center">Click to add education</p>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCredentials;
