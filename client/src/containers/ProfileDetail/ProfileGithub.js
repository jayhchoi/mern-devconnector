import React, { Component } from 'react';
import PropTypes from 'prop-types';

import keys from '../../configs/keys';

class ProfileGithub extends Component {
  state = {
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;

    const count = 5,
      sort = 'created: asc',
      clientId = keys.CLIENT_ID,
      clientSecret = keys.CLIENT_SECRET;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  }

  renderRepos() {
    const { repos } = this.state;

    return repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <hr />
        <h3 className="text-center text-info mb-4">Latest Github Ropos</h3>
        {this.renderRepos()}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
