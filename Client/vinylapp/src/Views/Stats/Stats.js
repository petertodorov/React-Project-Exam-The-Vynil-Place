import React, { Component, Redirect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast, ToastType } from 'react-toastify';
import './Stats.css'

import statsService from '../../services/statsService'

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            likedVinyls: [],
            dislikedVinyls: [],
            redirect: false
        };

    }
    statsService = new statsService();

    componentDidMount() {
        this.statsService.getAllUsers().then((data) => {
            data = data.filter(user => !user.roles.includes('Admin'))
            console.log(data);
            this.setState({
                users: data,
                redirect: false
            });
        }).catch(err => console.log(err));
    }


    render() {
        // if (this.state.redirect) {
        //     this.vinylService.getAllVinyls().then((data) => {
        //         this.setState({
        //             vinyls: data,
        //             redirect: false
        //         });
        //     }).catch(err => console.log(err));
        // }

        return (
            <div className="Home">
                <h2>Reviewers musical taste</h2>
                {this.props.user.isLoggedIn? null:
                (<h3>Not a reviewer?
                <NavLink exact to="/auth/register"> Become one</NavLink>
                </h3>)}
                {
                    this.state.users.map((user) => (
                        <ul >
                            <h2>{user.username} likes:</h2>
                            {
                                user.likedVinyls.map((vinyl) => (
                                    <li key={vinyl._id}>
                                        <div>
                                            {vinyl.title}</div>
                                            <img src={vinyl.image} alt="vinyl"/>
                                    </li>
                                ))
                            }
                            <h2> {user.username} doesn't like:</h2>
                            {
                                user.dislikedVinyls.map((vinyl) => (
                                    <li key={vinyl._id}>
                                        <div>
                                            {vinyl.title} 
                                            <img src={vinyl.image} alt="vinyl"/>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    ))
                }

            </div>
        );
    }
}

export default Stats;
