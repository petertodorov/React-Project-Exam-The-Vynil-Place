import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(event) {
        const name = event.target.name;

        if(this.state.hasOwnProperty(name)) {
          const value = event.target.value;
          this.setState({
            [name]: value,
          })
        }
      }
    onSubmitHandler(event) {
        event.preventDefault();
        this.props.login(this.state);
    }

    render() {
        if (this.props.user.isLoggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <label htmlFor="usernameLogin">Username</label>
                    <input type="text"
                        id="usernameLogin"
                        name="username"
                        placeholder="Your username"
                        onChange={this.onChangeHandler}
                        value={this.state.username} />
                    <label htmlFor="passwordLogin">Password</label>
                    <input type="password"
                        id="passwordLogin"
                        name="password"
                        placeholder="***"
                        onChange={this.onChangeHandler}
                        value={this.state.password} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;
