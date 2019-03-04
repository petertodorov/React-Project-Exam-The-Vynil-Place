import React, { Fragment } from 'react';
import { BrowserRouter as Router,  NavLink,  Switch } from 'react-router-dom';

const Header = (props) => {
 console.log(props.user.isLoggedIn);
 console.log(props.user.isAdmin);

    return (

        <header>
            <NavLink exact to="/about" className="logo">The Vinyl Place</NavLink>
            <div className="header-right">
                <NavLink exact to="/">Home</NavLink>
                <Switch>
                    {
                  props.user.isLoggedIn ?
                            (<Fragment>
                                <NavLink to="#">Welcome {props.user.username}!</NavLink>
                                {props.user.isAdmin ?
                                    (
                                        <Fragment>
                                            <NavLink exact to="/vinyl/create">Create</NavLink>
                                            <NavLink exact to="/vinyl/edit/:id">Edit</NavLink>
                                        </Fragment>
                                    )
                                    :
                                    (null)}
                                <NavLink exact to="#" onClick={props.logout}>Logout</NavLink>
                            </Fragment>)
                            :
                            (<Fragment>
                                <NavLink exact to="/auth/register">Register</NavLink>
                                <NavLink exact to="/auth/login">Login</NavLink>
                            </Fragment>)
                    }
                </Switch>
            </div>
        </header>
    )
}
export default Header