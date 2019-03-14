import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import VinylService from '../../services/vinylService'
import './Vinyls.css'

class Vinyls extends Component {
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

    messageHandler = (data) => {
        if (data.success) {
            toast.success(data.message);
            this.setState({
                redirect: true,
            });
        } else {
            if (data.message) {
                toast.error(data.message)
            }
            if (data.errors) {
                data.errors.forEach((err) => {
                    toast.error(err);
                });
            }
        }
    }


    likeHandler(event) {
        let id = event.target.id
        this.vinylService.likeVinyl(id).then((data) => {
            this.messageHandler(data)
        }).catch(err => console.log(err));
    }
    dislikeHandler(event) {
        let id = event.target.id
        this.vinylService.dislikeVinyl(id).then((data) => {
            this.messageHandler(data)
        }).catch(err => console.log(err));
    }

    allVinyls = () => {
        this.vinylService.getAllVinyls().then((data) => {
            this.setState({
                vinyls: data,
                redirect: false
            });
        }).catch(err => console.log(err));
    }
    componentDidMount() {
        this.allVinyls()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.redirect !== this.state.redirect) {
            this.allVinyls()
        }
    }

    render() {
        return (
            <div className="Vinyls-container">
                <h1>Vinyls</h1>
                <ul className="vinyls">
                    {
                        this.state.vinyls.map((vinyl) => (
                            <li className="vinyl" key={vinyl._id}>
                                <h2>{vinyl.artist}</h2>
                                <NavLink to={`/vinyl/details/${vinyl._id}`}><img src={vinyl.image} alt="cover" /></NavLink>
                                <h3>{vinyl.title} | {vinyl.year}</h3>
                                <div className="info">All Likes: {vinyl.likes} & Dislikes: {vinyl.dislikes}</div>
                                {
                                    this.props.user.isLoggedIn && !this.props.user.isAdmin
                                        ?
                                        (<Fragment>
                                            <NavLink to={`/vinyl/details/${vinyl._id}`} className="Link">Show Details</NavLink>
                                            <button id={vinyl._id} onClick={this.likeHandler} className="fa fa-thumbs-up Link" />
                                            <button id={vinyl._id} onClick={this.dislikeHandler} className="fa fa-thumbs-down Link" />
                                        </Fragment>)
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

export default Vinyls;