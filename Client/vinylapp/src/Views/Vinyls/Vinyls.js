import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import VinylService from '../../services/vinylService'
import WithDataFromServiceVinyls from '../../hocs/WithDataFromServiceVinyls'
import './Vinyls.css'
import { UserConsumer } from '../../user-context';
function Vinyls({ vinyls, user, likeHandler, dislikeHandler }) {
    return (
        <UserConsumer>
            {({ user }) =>
                <div className="Vinyls-container">
                    <h1>Vinyls</h1>
                    <ul className="vinyls">
                        {
                            vinyls.map((vinyl) => (
                                <li className="vinyl" key={vinyl._id}>
                                    <h2>{vinyl.artist}</h2>
                                    <NavLink to={`/vinyl/details/${vinyl._id}`}><img src={vinyl.image} alt="cover" /></NavLink>
                                    <h3>{vinyl.title} | {vinyl.year}</h3>
                                    <div className="info">All Likes: {vinyl.likes} & Dislikes: {vinyl.dislikes}</div>
                                    {
                                        user.isLoggedIn && !user.isAdmin
                                            ?
                                            (<Fragment>
                                                <NavLink to={`/vinyl/details/${vinyl._id}`} className="Link">Show Details</NavLink>
                                                <button id={vinyl._id} onClick={likeHandler} className="fa fa-thumbs-up Link" />
                                                <button id={vinyl._id} onClick={dislikeHandler} className="fa fa-thumbs-down Link" />
                                            </Fragment>)
                                            : (null)}
                                    {user.isAdmin
                                        ?
                                        (<span>
                                            <NavLink to={`/vinyl/edit/${vinyl._id}`} className="Edit">Edit</NavLink>
                                            <NavLink to={`/vinyl/delete/${vinyl._id}`} className="Delete">Delete</NavLink>
                                        </span>)
                                        : (null)}
                                </li>
                            ))
                        }
                    </ul>
                </div>}
        </UserConsumer>
    );
}
export default WithDataFromServiceVinyls(Vinyls, [], VinylService);



// function  Vinyls ({vinyls,user,likeHandler,dislikeHandler}) {    
//         return (
//             <div className="Vinyls-container">
//                 <h1>Vinyls</h1>
//                 <ul className="vinyls">
//                     {
//                        vinyls.map((vinyl) => (
//                             <li className="vinyl" key={vinyl._id}>
//                                 <h2>{vinyl.artist}</h2>
//                                 <NavLink to={`/vinyl/details/${vinyl._id}`}><img src={vinyl.image} alt="cover" /></NavLink>
//                                 <h3>{vinyl.title} | {vinyl.year}</h3>
//                                 <div className="info">All Likes: {vinyl.likes} & Dislikes: {vinyl.dislikes}</div>
//                                 {
//                                     user.isLoggedIn && !user.isAdmin
//                                         ?
//                                         (<Fragment>
//                                             <NavLink to={`/vinyl/details/${vinyl._id}`} className="Link">Show Details</NavLink>
//                                             <button id={vinyl._id} onClick={likeHandler} className="fa fa-thumbs-up Link" />
//                                             <button id={vinyl._id} onClick={dislikeHandler} className="fa fa-thumbs-down Link" />
//                                         </Fragment>)
//                                         :(null)}
//                                 {user.isAdmin
//                                         ?
//                                         (<span>
//                                             <NavLink to={`/vinyl/edit/${vinyl._id}`} className="Edit">Edit</NavLink>
//                                             <NavLink to={`/vinyl/delete/${vinyl._id}`} className="Delete">Delete</NavLink>
//                                         </span>)
//                                         :(null)}
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div>
//         );
// }

// export default WithDataFromServiceVinyls(Vinyls,[],VinylService);