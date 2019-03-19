import React, { createContext } from 'react';
import AuthService from './services/authService'
import { ToastContainer, toast } from 'react-toastify';

const UserContext = createContext({
    user: {
        isLoggedIn: false,
        username: '',
        userId: '',
        isAdmin: false
    },

    login: () => { },
    logout: () => { },
    updateState: () => { }
});

export class UserProvider extends React.Component {
    state = {
        user: {
            isLoggedIn: false,
            username: '',
            userId: '',
            isAdmin: false
        },
        login: this.login,
        logout: this.logout,
        updateState: this.updateState
    };
    static authService = new AuthService();

    logout = () => {
        localStorage.clear();
        this.updateState();
        if (!this.state.isLoggedIn) {
            toast.success("Logout successful!");
        }
    }


    login = async function (user) {
        try {
            let data = await this.authService.signIn(user);
            if (!data.success || !data.userData.username) {
                if (data.message.name) {
                    toast.error(data.message.name);
                }
                if (data.errors) {
                    data.errors.forEach((err) => {
                        toast.error(err);
                    });
                }
                return;
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', !!data.token.length);
                localStorage.setItem('username', data.userData.username);
                localStorage.setItem('userId', data.userData.userId);
                localStorage.setItem('isAdmin', data.userData.isAdmin);
                this.updateState(data.token)
                toast.success(data.message);
            } else {
                toast.error('No such user, please try again')
            }
        } catch (error) {
            console.log(`Server cannot log in the user, please try again`)
        }
    }

    updateState = token => {
        if (token) {
            this.setState({
                user: {
                    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
                    username: localStorage.getItem('username'),
                    userId: localStorage.getItem('userId'),
                    isAdmin: JSON.parse(localStorage.getItem('isAdmin')),
                },
            });
        } else {
            this.setState({
                user: {
                    isLoggedIn: false,
                    username: '',
                    userId: '',
                    isAdmin: false,
                },
            });
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
          this.updateState(token)
        }
      }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export const UserConsumer = UserContext.Consumer;