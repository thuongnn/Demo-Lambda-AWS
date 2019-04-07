import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            token: ''
        }
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser({
            bypassCache: false
        }).then(user => {
            let email = user['email'];
            console.log("user", user);
            Auth.currentCredentials().then(credentials => {
                let Logins = credentials['params']['Logins'];
                console.log("credentials", credentials);
                let jwtToken = Object.values(Logins);
                this.setState({token: jwtToken, email: email})
            });
        });
    }

    render() {
        const {email, token} = this.state;
        return (
            <div className="Home">
                <div className="lander">
                    <div>{email}</div>
                    <h1>JWT Token</h1>
                    <textarea style={{width: '60%', padding: '6px'}}
                              rows={7}
                              readOnly
                              value={token}/>
                </div>
            </div>
        );
    }
}
