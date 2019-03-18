import React from 'react'
function WithDataFromService(Component, typeOfData, serviceMethod) {
    return class extends React.Component {
        constructor(props){
            super(props);
            this.state={
                users:typeOfData
            }
        }

        async componentDidMount(){
            try{
             let data = await serviceMethod();
             data = data.filter(user => !user.roles.includes('Admin'))            
             this.setState({users:data})       
            }catch(err){
                console.log(err);
            }
        }
        render(){
            return <Component users = {this.state.users} {...this.props}/>
        }
    }
}

export default WithDataFromService;