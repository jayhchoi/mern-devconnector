const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGODB_URL } = require('./config/keys');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false })); // More on this later...
app.use(bodyParser.json());

mongoose
  .connect(
    process.env.MONGODB_URI || MONGODB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello!'));

// USER ROUTES
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
