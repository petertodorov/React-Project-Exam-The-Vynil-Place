import React, { Component, } from 'react';
import {  Redirect } from 'react-router-dom';
import {  toast } from 'react-toastify';

class Logout extends Component  {
    componentWillUnmount(){
        localStorage.clear()
    }

    render(){
        toast.success("Logout successful!");       
    }
}
export default Logout;