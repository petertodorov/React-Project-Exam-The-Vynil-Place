import React from 'react'
import { toast } from 'react-toastify';

function WithDataFromServiceVinyls(Component, typeOfData, service) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                vinyls: typeOfData,
                redirect: false
            };
    
            this.likeHandler = this.likeHandler.bind(this);
            this.dislikeHandler = this.dislikeHandler.bind(this);
        }
        vinylService = new service();
    
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
        render(){
            return <Component 
            vinyls = {this.state.vinyls} 
            likeHandler ={this.likeHandler} 
            dislikeHandler ={this.dislikeHandler}  {...this.props}/>
        }
    }
}

export default WithDataFromServiceVinyls;