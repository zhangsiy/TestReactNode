import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';

import Todo from './Todo';
import Home from './Home';
import SignedIn from './SignedIn';

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

    render() {
        if (this.state.idToken) {
          return (<SignedIn lock={this.lock} idToken={this.state.idToken} />);
        } else {
          return (<Home lock={this.lock} />);
        }
    }

    // render() {
    //     return (
    //         <div>
    //             <AppBar title='Google Proxy' />

    //             <LeftNav docked={false}>
    //               <MenuItem>Menu Item</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //               <MenuItem>Menu Item 2</MenuItem>
    //             </LeftNav>
         
    //             <section className="content">
    //               <Todo onClick={function() {alert('mamama');}} text="Alibaba" lock={this.lock} completed={false}>wahaha</Todo>
    //             </section>
    //         </div>
    //     );
    // }
}

export default App
