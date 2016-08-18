import React, { Component } from "react";
import $ from "jquery";
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import { showErrorMessage } from '../utils/helperFunctions';

class Signup extends Component {


  helperSignup() {
    const user=$('#UNSignUp').val();
    const pass= $('#UNSPass').val();
    if (user.length<7) {
      showErrorMessage("#SIMessages", 'Username must be 7+ characters', "notLongEnough");
    } else if (pass.length<7) {
      showErrorMessage("#SIMessages", 'Pass must be 7+ characters', "passNotLongEnough");
    } else {
      $.post("/signup", { user: user, pass: pass }, (resp) => {
        if (resp==="SuccessSignup") {
          this.props.logIn(user);
          this.context.router.push('/');
        } else {
          showErrorMessage("#SIMessages", 'Username Taken', "badSignUp");
        }
      });
    }
  }

  render() {
    return (
      <div id="signupContent">

        Username:<TextField id="UNSignUp" type="text" /><br />
        Password:<TextField id="UNSPass" type="password" /><br />
        <RaisedButton label="Signup" onClick={() => { this.helperSignup(); }} />
        <Link to="login" ><RaisedButton label="Click to Login Instead" /> </Link >
        <div id="SIMessages"><br /> </div>
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
