import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

import { socket } from '../peer';


class Signup extends Component {
  helperSignup() {
    const user=$('#UNSignUp').val();
    const pass= $('#UNSPass').val();
    console.log(user, pass);
    socket.emit('createUser', { user: user, pass: pass });
  }

  render() {
    return (
      <div id="signupContent">

        Username:<TextField id="UNSignUp" type="text" /><br />
        Password:<TextField  id="UNSPass" type="password" /><br />
        <RaisedButton label="Signup" onClick={() => {this.helperSignup()}} />
          <Link to="login" ><RaisedButton label="Click to Login Instead" onClick={() => { this.props.change('login')}} /> </Link >
      </div>
    );
  }
}

Signup.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Signup;
