import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Stats.css'

import statsService from '../../services/statsService'

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };

    }
    statsService = new statsService();

    componentDidMount() {
        this.statsService.getAllUsers().then((data) => {
            data = data.filter(user => !user.roles.includes('Admin'))
            this.setState({
                users: data,
            });
        }).catch(err => console.log(err));
    }


    render() {
        return (
            <div className="Stats">
                <h1>Statistics</h1>
                {this.props.user.isLoggedIn ? null :
                    (<h3>Not a reviewer?
                <NavLink exact to="/auth/register" className ="GoToLink"> Register here</NavLink>
                    </h3>)}
                <ul className="Users">
                    {this.state.users.map((user) => (
                        <Fragment>
                            <li className="UserRow" key={user._id}>
                                <div>
                                    <h2>{user.username} likes</h2>
                                    <ul>
                                        {user.likedVinyls.length > 0 ? (user.likedVinyls.map((vinyl) => (
                                            <li className="Vinyl" key={vinyl._id}>
                                                <div>
                                                    {vinyl.title}</div>
                                                <img src={vinyl.image} alt="vinyl" />
                                            </li>
                                        ))) : (<li className="EmptyBox">No Likes</li>)}

                                    </ul>
                                </div>
                                <div>
                                    <h2> {user.username} doesn't like</h2>
                                    <ul>
                                        {  user.dislikedVinyls.length>0 ?  (user.dislikedVinyls.map((vinyl) => (
                                            <li className="Vinyl" key={vinyl._id}>
                                                <div>
                                                    {vinyl.title}
                                                    <img src={vinyl.image} alt="vinyl" />
                                                </div>
                                            </li>
                                        ))):(<li className="EmptyBox">No Dislikes</li>)}
                                    </ul>
                                </div>
                            </li>
                        </Fragment>
                    ))
                    }
                </ul>
            </div>
        );
    }
}

export default Stats;
