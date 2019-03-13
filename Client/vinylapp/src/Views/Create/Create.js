import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import VinylService from '../../services/vinylService'
import './Create.css'
class Create extends Component {
    constructor(props) {
        super(props);
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
            redirect: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmitHandler = this.onSubmitHandler.bind(this)
    }

    onChangeHandler(event) {
        const name = event.target.name;
        if (this.state.vinyl.hasOwnProperty(name)) {
            const value = event.target.value;
            let vinyl = { ...this.state.vinyl };
            if (name === 'year') {
                vinyl[name] = Number(value);
            }
            else {
                vinyl[name] = value;
            }
            this.setState({ vinyl });
        }
    }

    vinylService = new VinylService();
    onSubmitHandler(event) {
        event.preventDefault();
        console.log(this.state.vinyl);
        this.vinylService.createVinyl(this.state.vinyl)
            .then((data) => {
                if (data.success) {
                    toast.success(data.message);
                    this.setState({
                        redirect: true,
                    });
                }
                else {
                    if (data.errors) {
                        data.errors.forEach((err) => {
                            toast.error(err);
                        });
                    }
                }
            }).catch(err => console.log(err));
    }



    render() {
        const { user } = this.props;
        if (!user.isAdmin ) {
            return <Redirect to="/home" />;
        }
        if(this.state.redirect){
            return <Redirect to="/vinyls" />;
        }

        return (
            <div className="Create">
                <h1>Create Vinyl</h1>
                <form onSubmit={this.onSubmitHandler} >
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter title"
                        onChange={this.onChangeHandler}

                        value={this.state.title} />

                    <label htmlFor="artist">Artist</label>
                    <input type="text" id="artist" name="artist" placeholder="Enter artist"
                        onChange={this.onChangeHandler}
                        value={this.state.artist} />

                    <label htmlFor="genre">Genre</label>
                    <input type="text" id="genre" name="genre" placeholder="Rock, World, Alternative, Other"
                        onChange={this.onChangeHandler}
                        value={this.state.genre} />

                    <label htmlFor="year">Year</label>
                    <input type="number" id="year" name="year" placeholder="Enter year"
                        onChange={this.onChangeHandler}
                        value={this.state.year} />


                    <label htmlFor="image">Image Url</label>
                    <input type="text" id="image" name="image" placeholder="Enter image url"
                        onChange={this.onChangeHandler}
                        value={this.state.image} />

                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }
}
export default Create;
