import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from '../../services/authService'
import './Home.css'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        
        return (
            <Fragment>
                <div>Home page</div>
                <div>{this.props.user.username}</div>
            </Fragment>

        );
    }
}

export default Home;
