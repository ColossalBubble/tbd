import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import $ from 'jquery';
import { showErrorMessage } from '../utils/helperFunctions';

class Login extends Component {

  helperLogin() {
    const user=$('#UNLogin').val();
    const pass= $('#UNPass').val();
    $.post("/login", { user: user, pass: pass }, (resp) => {
      if (resp==="Succ") {
        this.props.logIn(user);
        this.context.router.push('/');
      } else {
        showErrorMessage("#LIMessages", 'Bad login', "badLogin");
      }
    });
  }

  render() {
    return (
      <div id="loginContent">
        Username:<TextField id="UNLogin" /><br />
        Password:<TextField id="UNPass" type="password" /><br />
        <RaisedButton label="Login" onClick={() => { this.helperLogin(); }} / >
        <Link to="signup"><RaisedButton label="Click to signup" /></Link>
        <div id="LIMessages"><br /> </div>
      </div>
    );
  }
}

Login.propTypes = {
  params: React.PropTypes.object
};

Login.contextTypes = {
  router: React.PropTypes.object
};

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Login;
