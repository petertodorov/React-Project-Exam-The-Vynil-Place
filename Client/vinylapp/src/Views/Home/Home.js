import React, { Component, Redirect } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css'

import VinylService from '../../services/vinylService'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vinyls: [],
            redirect: false
        };

        this.likeHandler = this.likeHandler.bind(this);
        this.dislikeHandler = this.dislikeHandler.bind(this);
    }
    vinylService = new VinylService();


    likeHandler(event) {
        let id = event.target.id
        this.vinylService.likeVinyl(id).then((data) => {
            if (data.success) {
                toast.success(data.message);
                this.setState({
                    redirect: true,
                });
            } else {
                if (data.errors) {
                    data.errors.forEach((err) => {
                        toast.error(err);
                    });
                }
            }
        }).catch(err => console.log(err));
    }
    dislikeHandler(event) {
        let id = event.target.id
        this.vinylService.dislikeVinyl(id).then((data) => {
            if (data.success) {
                toast.success(data.message);
                this.setState({
                    redirect: true,
                });
            } else {
                if (data.errors) {
                    data.errors.forEach((err) => {
                        toast.error(err);
                    });
                }
            }
        }).catch(err => console.log(err));

    }

    componentDidMount() {
        this.vinylService.getAllVinyls().then((data) => {
            this.setState({
                vinyls: data,
                redirect: false
            });
        }).catch(err => console.log(err));
    }


    render() {
        if (this.state.redirect) {
            this.vinylService.getAllVinyls().then((data) => {
                this.setState({
                    vinyls: data,
                    redirect: false
                });
            }).catch(err => console.log(err));
        }

        return (
            <div className="Home">
                <h1>Vinyls</h1>
                <ul className="movies">
                    {
                        this.state.vinyls.map((vinyl) => (
                            <li className="movie" key={vinyl._id}>
                                <h2>{vinyl.title}</h2>
                                <NavLink to={`/vinyl/details/${vinyl._id}`}><img src={vinyl.image} alt="cover" /></NavLink>
                                <div className="Link">Likes: {vinyl.likes} Dislikes: {vinyl.dislikes}</div>
                                {
                                    this.props.user.isLoggedIn && !this.props.user.isAdmin
                                        ?
                                        (<span>
                                            <NavLink to={`/vinyl/details/${vinyl._id}`} className="Link">Show Details</NavLink>

                                            <button id={vinyl._id} onClick={this.likeHandler} className="fa fa-thumbs-up Link" />
                                            <button id={vinyl._id} onClick={this.dislikeHandler} className="fa fa-thumbs-down Link" />
                                        </span>)
                                        :
                                        (null)

                                }
                                {
                                    this.props.user.isAdmin
                                        ?
                                        (<span>
                                            <NavLink to={`/vinyl/edit/${vinyl._id}`} className="Edit">Edit</NavLink>
                                            <NavLink to={`/vinyl/delete/${vinyl._id}`} className="Edit">Delete</NavLink>
                                        </span>)
                                        :
                                        (null)
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default Home;
