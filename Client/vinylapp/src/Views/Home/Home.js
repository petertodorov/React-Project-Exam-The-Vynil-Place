import React, { Component, Fragment } from 'react';
import { Redirect,NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css'

import VinylService from '../../services/vinylService'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vinyls: []
        };
    }


    vinylService = new VinylService();
    componentDidMount() {
        this.vinylService.getAllVinyls().then((data) => {
            this.setState({
                vinyls: data
            });
            console.log(this.state.vinyls);
        })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        // const movieToShow = this.state.movies.filter(movie => {
        //   return movie._id === this.state.movieId;
        // })[0];

        return (
            <div className="Home">
                <h1>Vinyls</h1>
                <ul className="movies">
                    {
                        this.state.vinyls.map((vinyl) => (

                            <li className="movie" key={vinyl._id}>
                                <h2>{vinyl.title}</h2>
                                <NavLink to={`/vinyl/details/${vinyl._id}`}><img src={vinyl.image} alt="cover"/></NavLink>
                                {
                                    this.props.user.isLoggedIn
                                        ?
                                        (<span>
                                            <NavLink to={`/vinyl/details/${vinyl._id}`}  className="Link">Show Details</NavLink>
                                        </span>)
                                        :
                                        null
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
