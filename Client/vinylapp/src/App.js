import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Header from './Components/Header/Header'

import About from './Views/About/About'
import Home from './Views/Home/Home'
import Vinyls from './Views/Vinyls/Vinyls'

import Stats from './Views/Stats/Stats'
import Login from './Views/Login/Login'
import Register from './Views/Register/Register'

import Details from './Views/Details/Details'
import Create from './Views/Create/Create'
import Edit from './Views/Edit/Edit'
import Remove from './Views/Remove/Remove'
import NotFound from './Views/NotFound/NotFound';

import AuthService from './services/authService'

import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isLoggedIn: false,
        username: '',
        userId: '',
        isAdmin: false
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
          isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
          username: localStorage.getItem('username'),
          userId: localStorage.getItem('userId'),
          isAdmin: JSON.parse(localStorage.getItem('isAdmin')),
        },
      });
    } else {
      this.setState({
        user: {
          isLoggedIn: false,
          username: '',
          userId: '',
          isAdmin: false,
        },
      });
    }
  }

  async login(user) {
    try {
      let data = await App.authService.signIn(user);
      if (!data.success || !data.userData.username) {
        if (data.message.name) {
          toast.error(data.message.name);
        }
        if (data.errors) {
          data.errors.forEach((err) => {
            toast.error(err);
          });
        }
        return;
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', !!data.token.length);
        localStorage.setItem('username', data.userData.username);
        localStorage.setItem('userId', data.userData.userId);
        localStorage.setItem('isAdmin', data.userData.isAdmin);
        this.updateState(data.token)
        toast.success(data.message);
      } else {
        toast.error('No such user, please try again')
      }
    } catch (error) {
      console.log(`Server cannot log in the user, please try again`)
    }
  }

  logout() {
    localStorage.clear();
    this.updateState();
    if (!this.state.isLoggedIn) {
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
            <main>
              <ToastContainer closeButton={false} />
              <Switch>
                <Route exact path="/" component={Home} /> />} />
                <Route exact path="/home" component={Home} />} />
                <Route exact path="/about" component={About} />
                <Route exact path="/vinyls" render={() => <Vinyls user={this.state.user} />} />
                <Route exact path="/stats/users" render={() => <Stats user={this.state.user} />} />
                <Route exact path="/auth/login" render={() => <Login login={this.login} user={this.state.user} />} />
                <Route exact path="/auth/register" render={() => <Register login={this.login} user={this.state.user} />} />
                <Route exact path="/vinyl/create" render={() => <Create user={this.state.user} />} />
                <Route exact path="/vinyl/details/:id" render={(props) => <Details {...props} user={this.state.user} />} />
                <Route exact path="/vinyl/edit/:id" render={(props) => <Edit {...props} user={this.state.user} />} />
                <Route exact path="/vinyl/delete/:id" render={(props) => <Remove {...props} user={this.state.user} />} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
