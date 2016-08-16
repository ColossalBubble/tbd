import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import $ from 'jquery';

class Login extends Component {
  helperLogin() {
    console.log($('#UNLogin').val(), $('#UNPass').val());


  }

  render() {
    return (
      <div id ="loginContent">
        Username:<TextField id="UNLogin" /><br />
        Password:<TextField id="UNPass" type="password" /><br />
        <RaisedButton label="Login" onClick={() => {this.helperLogin()}} / >
        <Link to="signup"><RaisedButton label="Click to signup" onClick={() => { this.props.change('SelectRoom')}} /></Link>
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Login;
