import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import About from'./Views/About/About'
import NotFound from './Views/NotFound';


import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }
  render() {
    return (
      <div className="App">
          <Router>
            <Fragment>
              {/* <Header logout={this.logout} user={this.state.user} /> */}
              <ToastContainer closeButton={false} />
              <Switch>
                {/* <Route exact path="/" render={() => <Home user={this.state.user}/>} /> */}
                <Route path="/about" component={About} /> 
                {/* <Route exact path="/login" render={() => <Login login={this.login} user={this.state.user}/>} /> */}
                {/* <Route exact path="/register" render={() => <Register login={this.login} user={this.state.user}/>} /> */}
                {/* <Route exact path="/vinyl/create" render={() => <Create user={this.state.user}/>} /> */}
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
      </div>
    );
  }
}

export default App;
  