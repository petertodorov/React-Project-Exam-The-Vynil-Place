import React, { Component } from 'react';
import { Redirect,NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import VinylService from '../../services/vinylService'
import './Remove.css'
class Remove extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vinyl: {
                title: '',
                artist: '',
                image: '',
               
            },
            redirect: false,
        };
        this.deleteHandler = this.deleteHandler.bind(this)
        // this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }
    vinylService = new VinylService();

    deleteHandler(event) {
        this.vinylService.removeVinyl(this.state.vinyl)
            .then((data) => {
                console.log(data);
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
        let currentId = this.props.match.params.id;
        let vinyl = {}
        this.vinylService.getAllVinyls().then((data) => {
            vinyl = data.filter(vinyl => { return vinyl._id === currentId }).pop()
            this.setState({ vinyl })
        }).catch(err => { console.log(err) });
    }

    render() {
        const { user } = this.props;
        const {  artist, image } = this.state.vinyl;
        if (!user.isAdmin || this.state.redirect) {
            return <Redirect to="/home" />;
        }
        return (
           <div>
                <div className="Details">
       
                    <h2>Artist: {artist}</h2>
                </div>
                <div className="Vinyl">
                    <img src={image} alt="cover" />
                    <h3>Are you sure you want to delete this vinyl?</h3>
                    <button className="Link" onClick={this.deleteHandler}>Yes</button>
                    <NavLink to="/home" className="Link">No</NavLink>
                </div>
            </div>
        );
    }
}
export default Remove;
