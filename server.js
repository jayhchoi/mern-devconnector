const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGODB_URI } = require('./config/keys');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const passport = require('passport');

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false })); // This is for easy request from postman?
app.use(bodyParser.json());

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

// USER ROUTES
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

// Production behaviors
if (process.env.NODE_ENV === 'production') {
  // Express will serve up static assets
  app.use(express.static('client/build'));

  // Express responses with root html file
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
