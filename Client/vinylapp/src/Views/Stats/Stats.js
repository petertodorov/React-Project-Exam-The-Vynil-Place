import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Stats.css'

import statsService from '../../services/statsService'
import WithDataFromService from'../../hocs/WithDataFromService'

function Stats(props) {
    
        if (!props.users.length && !props.user.isLoggedIn) {
            return (
                <div className="Stats" >
                    <h1>No reviewers</h1>
                    <h3>
                        Want to vote? <NavLink exact to="/auth/register" className="GoToLink"> Register here</NavLink>
                    </h3>
                </div>
            )
        }
        return (
            <div className="Stats">
                <h1>Statistics</h1>
                {props.user.isLoggedIn ? null :
                    (<div>
                        <h3>
                            Not a reviewer?<NavLink exact to="/auth/register" className="GoToLink"> Register here</NavLink>
                        </h3>
                    </div>)
                }
                <ul className="Users">
                    {
                      props.users.map((user) => (
                            <Fragment>
                                <li className="UserRow" key={user._id}>
                                    <div>
                                        <h2>{user.username} likes</h2>
                                        <ul className="VinylsList">
                                            {
                                                user.likedVinyls.length > 0
                                                    ?
                                                    (user.likedVinyls.map((vinyl) => (
                                                        <li className="Vinyl" key={vinyl._id}>
                                                            <div>
                                                                <h4>{vinyl.title}</h4>
                                                                <img src={vinyl.image} alt="vinyl" />
                                                            </div>
                                                        </li>
                                                    ))
                                                    )
                                                    :
                                                    (<li className="EmptyBox">No Likes</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2> {user.username} doesn't like</h2>
                                        <ul className="VinylsList">
                                            {
                                                user.dislikedVinyls.length > 0
                                                    ?
                                                    (user.dislikedVinyls.map((vinyl) => (
                                                        <li className="Vinyl" key={vinyl._id}>
                                                            <div>
                                                                <h4>{vinyl.title}</h4>
                                                                <img src={vinyl.image} alt="vinyl" />
                                                            </div>
                                                        </li>
                                                    ))
                                                    )
                                                    :
                                                    (<li className="EmptyBox">No Dislikes</li>)}
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
export default  WithDataFromService(Stats,[], new statsService().getAllUsers);
 