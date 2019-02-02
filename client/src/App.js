import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import { Navbar, Footer, Landing } from './components/layouts';
import { Register, Login } from './components/auth/';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" render={() => <Register />} />
            <Route exact path="/login" render={() => <Login />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
