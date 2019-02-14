import axios from 'axios';

export default token => {
  if (token) {
    // Set Authorization headers with the token
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Unset token from headers
    delete axios.defaults.headers.common['Authorization'];
  }
};
