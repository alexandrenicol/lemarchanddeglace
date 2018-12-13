import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home';

const About = () => <h2>About</h2>;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Le Marchand de Glace®</h1>
            <p>Your digital ice cream factory circa 2018</p>
            <div className="messages">
              <div className="message -left">
                <div className="balloon from-left">
                  <p>
                    Pick your container, your scoops, some toppings and submit!
                  </p>
                </div>
              </div>
            </div>
          </header>

          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
