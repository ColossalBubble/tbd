import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import $ from 'jquery';

class Login extends Component {

  constructor(props, context) {
    super(props);
    context.router;
  }

  helperLogin() {
    const user=$('#UNLogin').val();
    const pass= $('#UNPass').val();
    $.post("/login", { user: user, pass: pass }, (resp) => {
      if (resp==="Succ") {
        this.props.logIn();
        this.context.router.push('/');
      } else  {
        $("#LIMessages")
        .append('<div id="badLogin"> Bad login </div>')
        .hide()
        .fadeIn(999)
        .fadeOut(999)
        .queue(next => {
          $("#badLogin").remove();
          next();
        });
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
        <div id="LIMessages"><br/> </div>
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
