import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css'
import Vinyl from './vinyl.png'
class Home extends Component {
    

    render() {
        
        return (
            <div className="Home">
                <h1>The Vinyl Place</h1>
                <img className="HomeImage"src={Vinyl} alt="vinyl"/>
            </div>
        )
    }
}

export default Home;
