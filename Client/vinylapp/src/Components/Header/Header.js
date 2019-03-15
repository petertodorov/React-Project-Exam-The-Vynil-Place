import React, { Fragment } from 'react';
import {  NavLink,  Switch } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <NavLink exact to="/about" className="link logo">The Vinyl Place</NavLink>
            <div className="header-right">
                <Switch>
                    {
                  props.user.isLoggedIn ?
                            (<Fragment>

                                <NavLink to="#" className="link">Welcome, {props.user.username}!</NavLink>
                                {props.user.isAdmin ?
                                    (
                                        <Fragment>
                                            <NavLink exact to="/vinyl/create" className="link">Create</NavLink>
                                        </Fragment>
                                    )
                                    :
                                    (null)}
                                    <NavLink exact to="/home" className="link">Home</NavLink>
                <NavLink exact to="/vinyls" className="link">Vinyls</NavLink>
                <NavLink exact to="/stats/users" className="link" >Stats</NavLink>

                                <NavLink exact to="/" className="link" onClick={props.logout}>Logout</NavLink>
                            </Fragment>)
                            :
                            (<Fragment>
                                <NavLink exact to="/home" className="link">Home</NavLink>
                <NavLink exact to="/vinyls" className="link">Vinyls</NavLink>
                <NavLink exact to="/stats/users" className="link" >Stats</NavLink>

                                <NavLink exact to="/auth/register" className="link">Register</NavLink>
                                <NavLink exact to="/auth/login" className="link">Login</NavLink>
                            </Fragment>)
                    }
                </Switch>
            </div>
        </header>
    )
}
export default Header