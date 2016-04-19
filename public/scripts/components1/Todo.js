import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class Todo extends React.Component {
    render() {
        return (
            <div>
                <li
                    onClick={this.props.onClick}
                    style={{
                        textDecoration: this.props.completed ? 'line-through' : 'none'
                    }}
                >
                    {this.props.text}
                </li>
                <RaisedButton 
                    label="Click Me"
                    primary={true}
                    onClick={ function() { alert('Adele Gua Gua!'); } }
                />
            </div>
        )
    }
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo