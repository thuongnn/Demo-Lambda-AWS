import React, {Component} from 'react';
import Home from './Home';

import Amplify from 'aws-amplify';
import {Authenticator} from 'aws-amplify-react/dist/Auth';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);
const federated = {
    google_client_id: '345185909456-oosi4vr959gt4i3k0q0vmlm2ki242j1f.apps.googleusercontent.com',
    facebook_app_id: '155841285330063'
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    setStateLogin = (status) => {
        this.setState({isLogin: status})
    };

    render() {
        const {isLogin} = this.state;
        return (
            <Authenticator
                onStateChange={(authState) => authState === "signedIn" ? this.setStateLogin(true) : this.setStateLogin(false)}
                federated={federated}>
                {isLogin ? <Home/> : ""}
            </Authenticator>
        );
    }
}

export default App;
