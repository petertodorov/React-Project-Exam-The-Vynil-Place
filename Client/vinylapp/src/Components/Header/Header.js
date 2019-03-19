import React, { Fragment } from 'react';
import { NavLink, Switch } from 'react-router-dom';
import { UserConsumer } from '../../user-context';
const Header = () => {
    return (
        <UserConsumer>
            {({ isLoggedIn, isAdmin, username, logout }) => <header>
                <NavLink exact to="/about" className="link logo">The Vinyl Place</NavLink>
                <div className="header-right">
                    <Switch>
                        {isLoggedIn && (<Fragment>
                            <NavLink to="#" className="link">Welcome, {username}!</NavLink>
                            {isAdmin && (<NavLink exact to="/vinyl/create" className="link">Create</NavLink>)}
                            <NavLink exact to="/home" className="link">Home</NavLink>
                            <NavLink exact to="/vinyls" className="link">Vinyls</NavLink>
                            <NavLink exact to="/stats/users" className="link" >Stats</NavLink>
                            <NavLink exact to="/" className="link" onClick={logout}>Logout</NavLink>
                        </Fragment>)
                        }
                        {!isLoggedIn && (<Fragment>
                            <NavLink exact to="/home" className="link">Home</NavLink>
                            <NavLink exact to="/vinyls" className="link">Vinyls</NavLink>
                            <NavLink exact to="/stats/users" className="link" >Stats</NavLink>
                            <NavLink exact to="/auth/register" className="link">Register</NavLink>
                            <NavLink exact to="/auth/login" className="link">Login</NavLink>
                        </Fragment>)
                        }
                    </Switch>
                </div>
            </header>}
        </UserConsumer>
    );
}
export default Header



// const Header = (props) => {
//     const { isLoggedIn, isAdmin, username } = props.user;
//     return (
//         <header>
//             <NavLink exact to="/about" className="link logo">The Vinyl Place</NavLink>
//             <div className="header-right">
//                 <Switch>
//                     {isLoggedIn && (<Fragment>
//                         <NavLink to="#" className="link">Welcome, {username}!</NavLink>
//                         {isAdmin && (<NavLink exact to="/vinyl/create" className="link">Create</NavLink>)}
//                         <NavLink exact to="/home" className="link">Home</NavLink>
//                         <NavLink exact to="/vinyls" className="link">Vinyls</NavLink>
//                         <NavLink exact to="/stats/users" className="link" >Stats</NavLink>
//                         <NavLink exact to="/" className="link" onClick={props.logout}>Logout</NavLink>
//                     </Fragment>)
//                     }
//                     {!isLoggedIn && (<Fragment>
//                         <NavLink exact to="/home" className="link">Home</NavLink>
//                         <NavLink exact to="/vinyls" className="link">Vinyls</NavLink>
//                         <NavLink exact to="/stats/users" className="link" >Stats</NavLink>
//                         <NavLink exact to="/auth/register" className="link">Register</NavLink>
//                         <NavLink exact to="/auth/login" className="link">Login</NavLink>
//                     </Fragment>)
//                     }
//                 </Switch>
//             </div>
//         </header>
//     )
// }
// export default Header