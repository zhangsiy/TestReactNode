import React from 'react';
import { browserHistory, Link} from 'react-router';
import $ from 'jquery';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

import Todo from './Todo';
import Home from './Home';
import SignedIn from './SignedIn';
import Test from './Test';

class App extends React.Component {
    componentWillMount() {
        this.setupAjax();
        this.createLock();
        this.setState({idToken: this.getIdToken()});
    }

    createLock() {
        this.lock = new Auth0Lock('sVjv6vTPwY5TDkGfD4zG7yg0Fqj0WaCm', 'zhangsiy.auth0.com');
    }

    setupAjax() {
        $.ajaxSetup({
          'beforeSend': function(xhr) {
            if (localStorage.getItem('userToken')) {
              xhr.setRequestHeader('Authorization',
                    'Bearer ' + localStorage.getItem('userToken'));
            }
          }
        });
    }

    getIdToken() {
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

    // render() {
    //     if (this.state.idToken) {
    //       return (<SignedIn lock={this.lock} idToken={this.state.idToken} />);
    //     } else {
    //       return (<Home lock={this.lock} />);
    //     }
    // }

    render() {
        return (
            <div>
                <div className="nav">
                    <RaisedButton
                      containerElement={<Link to="/" />}
                      linkButton={true}
                      label='Home'/>
                    <RaisedButton
                      containerElement={<Link to="test" />}
                      linkButton={true}
                      label='Test'/>
                    <RaisedButton
                      containerElement={<Link to="signin" params={{lock:this.lock}}/>}
                      linkButton={true}
                      label='Sign In'/>
                </div>
                <div>hahaha</div>
                {this.props.children}
            </div>
        );
    }

    // render() {
    //     return (
    //         <div>
    //             <AppBar title='Google Proxy' />

    //             <LeftNav docked={true}>
    //               <Link to="todo">Todo</Link>
    //             </LeftNav>
         
    //             <div>This is main page!</div>
    //         </div>
    //     );
    // }
}

export default App
