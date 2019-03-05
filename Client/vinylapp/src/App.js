import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import About from './Views/About/About'
import Header from './Components/Header/Header'
import Login from './Views/Login/Login'
import Register from './Views/Register/Register'
import NotFound from './Views/NotFound/NotFound';
import AuthService from './services/authService'

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isLoggedIn: '',
        username: '',
        userId: '',
        token: '',
        isAdmin: ''
      }
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  static authService = new AuthService();

  updateState(token) {
    if (token) {
    this.setState({
        user: {
          token: token,
          isLoggedIn: !!token.length,
          username: localStorage.getItem('username'),
          userId: localStorage.getItem('userId'),
          isAdmin: JSON.parse(localStorage.getItem('isAdmin')),
        },
      });
    return true
    }else{
      this.setState({
        user: {
          isLoggedIn: false,
          username: '',
          userId: '',
          token: '',
          isAdmin: false,
        },
      });
    return false;
    }
  }

  async login(user) {
    try {
      let data = await App.authService.signIn(user);
      if (!data.success || !data.userData.username) {
        toast.error(data.message);
        return;
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.userData.username);
        localStorage.setItem('userId', data.userData.userId);
        localStorage.setItem('isAdmin', data.userData.isAdmin);
        this.updateState(data.token)
      } else {
        toast.error('No such user, please try again')
      }
      toast.success(data.message);
    } catch (error) {
      console.log(`Server cannot log in the user, please try again`)
    }
  }

  logout(event) {
    event.preventDefault();
    localStorage.clear()
    if(!this.updateState(localStorage.getItem('token'))){
      toast.success("Logout successful!");
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.updateState(token)
    }
  }

  render() {

    return (
      <div className="App">
        <Router>
          <Fragment>
            <Header logout={this.logout} user={this.state.user} />
            <ToastContainer closeButton={false} />
            <Switch>
              {/* <Route exact path="/" render={() => <Home user={username}/>} /> */}
              <Route exact path="/about" component={About} />
              <Route exact path="/auth/login" render={() => <Login login={this.login} user={this.state.user} />} />
              <Route exact path="/auth/register" render={() => <Register login={this.login} user={this.state.user} />} />
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
