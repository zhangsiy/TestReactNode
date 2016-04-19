import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class Home extends React.Component {
    constructor() {
        super();
        this.showLock = this.showLock.bind(this);
    }

    showLock() {
        // We receive lock from the parent component in this case
        // If you instantiate it in this component, just do this.lock.show()
        this.props.lock.show();
    }

    render() {
        return (
            <div className="login-box auth0-box before">
              <img src="https://i.cloudup.com/StzWWrY34s.png" />
              <h3>Auth0 Example</h3>
              <p>Zero friction identity infrastructure, built for developers</p>
              <RaisedButton 
                    label="Sign In"
                    primary={true}
                    onClick={this.showLock}
                />
            </div> );
    }
}

export default Home
