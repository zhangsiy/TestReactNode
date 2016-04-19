import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router'
import $ from 'jquery';
import RaisedButton from 'material-ui/lib/raised-button';

class SignedIn extends React.Component {
    constructor() {
        super();

        this.state = {
            profile: null
        };

        this.callApi = this.callApi.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    callApi() {
        $.ajax({
          url: '/api/v1/comments',
          method: 'GET'
        }).then(function(data, textStatus, jqXHR) {
          alert("The request to the secured enpoint was successfull");
        }, function() {
          alert("You need to download the server seed and start it to call this API");
        });
    }

    signOut() {
        localStorage.removeItem('userToken');
        browserHistory.push('/');
    }   

    componentDidMount() {
        this.props.lock.getProfile(this.props.idToken, function (err, profile) {
          if (err) {
            console.log("Error loading the Profile", err);
            alert("Error loading the Profile");
          }
          this.setState({profile: profile});
        }.bind(this));
    }

    render() {
        if (this.state.profile) {
          return (
            <div className="logged-in-box auth0-box logged-in">
              <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
              <img src={this.state.profile.picture} />
              <h2>Welcome {this.state.profile.nickname}</h2>
              <RaisedButton
                onClick={this.callApi}
                label="Call API" 
              />
              <RaisedButton
                onClick={this.signOut}
                label="Sign Out" 
              />
            </div>);
        } else {
          return (
            <div className="logged-in-box auth0-box logged-in">
              <h1 id="logo"><img src="https://cdn.auth0.com/blog/auth0_logo_final_blue_RGB.png" /></h1>
            </div>);
        }
    }
}

export default SignedIn