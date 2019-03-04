import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import About from './Views/About/About'
import Header from './Components/Header/Header'
import Login from './Views/Login/Login'
import Register from './Views/Register/Register'
import NotFound from './Views/NotFound/NotFound';


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
        token: '',
        isAdmin: false
      }
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

   login(user) { 
   fetch('http://localhost:5000/auth/signin', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(rawData => rawData.json())
    .then((data) => {
      console.log(data);

      if(data.success){
        toast.success(data.message);
      }

      if(!data.success){
        toast.error(data.message);
        return;
      }
      
        if(!data.token || !data.userData.username ) {
          toast.error('404 Not Found no such user');
          return;
        }
        

        
        localStorage.setItem('username', data.userData.username);
        localStorage.setItem('userId', data.userData.userId);
        localStorage.setItem('token', data.token);
        localStorage.setItem('isAdmin',data.userData.isAdmin);

        this.setState({
          user: {
            isLoggedIn: true,
            username: data.userData.username,
            userId: data.userData.userId,
            token: data.token,
            isAdmin: data.userData.isAdmin,
          },
        });      
      })
      .catch((error)=>console.log(`login error: ${error}`));
  }

  logout(event) {
    event.preventDefault();

    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');

    this.setState({
      user: {
        isLoggedIn: false,
        username: '',
        userId: '',
        token: '',
        isAdmin: false,
      },
    });

    toast.success("Logout successful!");
  }

  componentDidMount() {

    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin')==='true';
    if(localStorage.getItem('token')) {
      this.setState({
        user: {
          isLoggedIn: true,
          username: username,
          userId: userId,
          token: token,
          isAdmin: isAdmin,
        },
      });      
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
              <Route exact path="/auth/register" render={() => <Register login={this.login} user={this.state.user}/>} />
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
