import React from 'react';
import { browserHistory, Link} from 'react-router';
import $ from 'jquery';

import { LeftNav, MenuItem } from 'material-ui';
import { FlatButton, RaisedButton } from 'material-ui';
import { AppBar } from 'material-ui';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leftNavOpen: false
        };
    }

    componentWillMount() {
        this.setupAjax();
        this.createLock();

        this.setState({idToken: this.getIdToken()});
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

    logout = () => {
        localStorage.removeItem('userToken');
        this.setState({idToken: null});
        browserHistory.push('/');
    }

    handleNavButtonTouchTap = (route) => {
        browserHistory.push(route);
    }

    handleLeftNavToggle = () => {
        this.setState({leftNavOpen: !this.state.leftNavOpen});
    }

    handleLeftNavClose = () => {
        this.setState({leftNavOpen: false});
    }

    render() {
        var wrapperDivStyle = {
            padding: 0,
            margin: 0
        };

        var navItemStyle = {
            color: 'white'
        };

        var leftNavHeaderStyle = {
            backgroundColor: "#00bcd4",
            color: "rgba(255, 255, 255, 1)",
            fontSize: 24,
            fontWeight: 300,
            lineHeight: "64px",
            marginBottom: 8,
            paddingLeft: 24
        };

        var loginButton = this.state.idToken 
                    ? <FlatButton
                      label='Logout'
                      style={navItemStyle}
                      primary={true}
                      onTouchTap={this.logout} />
                    : <FlatButton
                      label='Login'
                      style={navItemStyle}
                      primary={true}
                      onTouchTap={this.showLogInWindow} />;

        return (
            <div style={wrapperDivStyle}>
                <AppBar 
                    title="Dragon's Nest" 
                    onLeftIconButtonTouchTap={this.handleLeftNavToggle} >
                    <FlatButton
                      onTouchTap={() => this.handleNavButtonTouchTap('/')}
                      style={navItemStyle}
                      label='Home' />
                    <FlatButton
                      onTouchTap={() => this.handleNavButtonTouchTap('about')}
                      style={navItemStyle}
                      label='About' />
                    <FlatButton
                      onTouchTap={() => this.handleNavButtonTouchTap('contact')}
                      style={navItemStyle}
                      label='Contact' />
                    {loginButton}
                </AppBar>
                {this.props.children}
                <LeftNav
                  docked={false}
                  width={200}
                  open={this.state.leftNavOpen}
                  onRequestChange={open => this.setState({leftNavOpen:open})}
                >
                  <div style={leftNavHeaderStyle}>My Apps</div>
                  <MenuItem onTouchTap={this.handleLeftNavClose}>Todos</MenuItem>
                </LeftNav>
            </div>
        );
    }
}

export default App;
