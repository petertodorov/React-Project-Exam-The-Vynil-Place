import React, { Component } from 'react';
import { Redirect,NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import VinylService from '../../services/vinylService'
import './Edit.css'
class Edit extends Component {
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
            redirect: false,
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

    componentDidMount() {
        let currentId = this.props.match.params.id;
        let vinyl = {}
        this.vinylService.getAllVinyls().then((data) => {
            vinyl = data.filter(vinyl => { return vinyl._id === currentId }).pop()
            this.setState({ vinyl })
        }).catch(err => { console.log(err) });
    }

    vinylService = new VinylService();
    async onSubmitHandler(event) {
        event.preventDefault();
        this.vinylService.editVinyl(this.state.vinyl)
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



    render() {
        const { user } = this.props;
        const { title, genre, artist, year, image } = this.state.vinyl;
        if (!user.isAdmin || this.state.redirect) {
            return <Redirect to="/vinyls" />;
        }

        return (
            <div className="Create">
                <h1>Edit  Vinyl</h1>
                <form onSubmit={this.onSubmitHandler} >
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title"
                        onChange={this.onChangeHandler}
                        value={title} />

                    <label htmlFor="trailerUrl">Artist</label>
                    <input type="text" id="artist" name="artist"
                        onChange={this.onChangeHandler}
                        value={artist} />
            
                    <label htmlFor="genre">Genre</label>
                    <select type="text"
                        id="genre"
                        name="genre"
                        value={genre}
                        onChange={this.onChangeHandler}>
                        <option className="optionInput">Rock</option>
                        <option className="optionInput">World</option>
                        <option className="optionInput">Alternative</option>
                        <option className="optionInput" >Other</option>
                    </select>
          
            
                    {/* <input type="text" id="genre" name="genre"
                        onChange={this.onChangeHandler}
                        value={genre} /> */}

                    <label htmlFor="storyLine">Year</label>
                    <input type="number" id="year" name="year" placeholder="Enter year"
                        onChange={this.onChangeHandler}
                        value={year} />


                    <label htmlFor="image">Image Url</label>
                    <input type="text" id="image" name="image"
                        onChange={this.onChangeHandler}
                        value={image} />

                    <input type="submit" className="Button" value="Edit" />
                    <NavLink exact to ="/vinyls" className="Back">Back to Vinyls</NavLink>
                </form>
            </div>
        );
    }
}
export default Edit;
