import React from 'react';
import { browserHistory, Link} from 'react-router';
import $ from 'jquery';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

import Home from './Home';
import SignedIn from './About';
import Test from './Contact';

class App extends React.Component {

    componentWillMount() {
        this.setupAjax();
        this.createLock();

        this.setState({idToken: this.getIdToken()});
    }

    test = () => {
        alert('hahaha');
    }

    // Create Auth0 lock
    createLock = () => {
        this.lock = new Auth0Lock('sVjv6vTPwY5TDkGfD4zG7yg0Fqj0WaCm', 'zhangsiy.auth0.com');
    }

    // Inject the needed autenticated token into Ajax request
    // header
    setupAjax = () => {
        $.ajaxSetup({
          'beforeSend': function(xhr) {
            if (localStorage.getItem('userToken')) {
              xhr.setRequestHeader('Authorization',
                    'Bearer ' + localStorage.getItem('userToken'));
            }
          }
        });
    }

    getIdToken = () => {
        var idToken = localStorage.getItem('userToken');
        var authHash = this.lock.parseHash(window.location.hash);
        if (!idToken && authHash) {
          if (authHash.id_token) {
            idToken = authHash.id_token
            localStorage.setItem('userToken', authHash.id_token);
          }
          if (authHash.error) {
            console.log("Error signing in", authHash);
          }
        }
        return idToken;
    }

    showLogInWindow = () => {
        // We receive lock from the parent component in this case
        // If you instantiate it in this component, just do this.lock.show()
        this.lock.show();
    }

    render() {
        return (
            <div>
                <div className="nav">
                    <RaisedButton
                      containerElement={<Link to="/" />}
                      linkButton={true}
                      label='Home'/>
                    <RaisedButton
                      containerElement={<Link to="about" />}
                      linkButton={true}
                      label='About'/>
                    <RaisedButton
                      containerElement={<Link to="contact" />}
                      linkButton={true}
                      label='Contact'/>
                    <RaisedButton
                      label='Login'
                      linkButton={true}
                      onClick={this.showLogInWindow} />
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default App;
