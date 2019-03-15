import React, { Component } from 'react';
import { NavLink,Redirect } from 'react-router-dom';

import './Details.css'
import VinylService from '../../services/vinylService'
class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vinyl: {
                title: '',
                genre: '',
                artist: '',
                year: 0,
                image: '',
                likes: 0,
                dislikes: 0
            },
        }
    }
    vinylService = new VinylService();
    componentDidMount() {
        let currentId = this.props.match.params.id;
        let vinyl ={};
        this.vinylService.getAllVinyls().then((data) => {
         vinyl = data.filter(vinyl=>{return vinyl._id===currentId}).pop()
        this.setState({ vinyl})
        }).catch(err => { console.log(err) });
    }    
    render() {
        const { title, artist, genre, year, image, likes, dislikes } = this.state.vinyl;
        console.log(title);
        if (!this.props.user.isLoggedIn) {
            return <Redirect to="/auth/login" />;
        }
        return (
                <div className="Vinyl">
                    <img src={image} alt="cover" />
                    <h2>Artist: {artist}</h2>
                   
                    <h4>Title: {title}</h4>
                    <h4>Genre: {genre}</h4>
                    <h4>Year of release: {year}</h4>
                    <h4>Total Likes: {likes}</h4>
                    <h4>Total dislikes: {dislikes}</h4>
                    <NavLink exact to ="/vinyls" className="Link">Back to Vinyls</NavLink>
                </div>
        )
    }
}






export default Details;
