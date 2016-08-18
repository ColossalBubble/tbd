import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import $ from 'jquery';

class Signup extends Component {

  constructor(props, context) {
    super(props);
    context.router;
  }

  helperSignup() {
    const user=$('#UNSignUp').val();
    const pass= $('#UNSPass').val();
    $.post("/signup", { user: user, pass: pass }, (resp) => {
      console.log(resp);
      if (resp==="SuccessSignup") {
        this.props.logIn();
        this.context.router.push('/');
      } else {
      console.log("User already exists!");
        $("#SIMessages")
          .append('<div id="badSignup"> Username Taken </div>')
          .hide()
          .fadeIn(999)
          .fadeOut(999)
          .queue(next => {
            $("#badSignup").remove();
            next();
          });
      }
    });
  }

  render() {
    return (
      <div id="signupContent">

        Username:<TextField id="UNSignUp" type="text" /><br />
        Password:<TextField id="UNSPass" type="password" /><br />
        <RaisedButton label="Signup" onClick={() => { this.helperSignup(); }} />
        <Link to="login" ><RaisedButton label="Click to Login Instead" /> </Link >
        <div id="SIMessages"><br/> </div>
      </div>
    );
  }
}

Signup.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Signup.contextTypes = {
  router: React.PropTypes.object
};


export default Signup;
