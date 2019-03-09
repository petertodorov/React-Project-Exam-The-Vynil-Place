import {post } from '../data/crud'

class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:5000/auth';
        this.signInUrl = `${this.baseUrl}/signin`
        this.signUpUrl = `${this.baseUrl}/signup`
    }
    signIn(data){
        return post(this.signInUrl,data);
    }
    signUp(data){
        return post(this.signUpUrl,data);
    }
}
export default AuthService;