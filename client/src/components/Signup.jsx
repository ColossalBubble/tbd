import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import { socket } from '../peer';

class Signup extends Component {

constructor(props, context) {
    super(props);
    context.router;
 }

  componentDidMount() {
    socket.on('UserAlreadyExists', function(msg) {
      console.log(msg);
    });

    socket.on('SuccessSignup', msg=> {
      console.log(msg);
      this.context.router.push('/');
    });
  }

  helperSignup() {
    const user=$('#UNSignUp').val();
    const pass= $('#UNSPass').val();
   $.post("/signup", { user: user, pass: pass }, (resp) => {
      if (resp==="SuccessSignup") {
        this.context.router.push('/');
      }
    });
  }

  render() {
    return (
      <div id="signupContent">

        Username:<TextField id="UNSignUp" type="text" /><br />
        Password:<TextField  id="UNSPass" type="password" /><br />
        <RaisedButton label="Signup" onClick={() => {this.helperSignup()}} />
          <Link to="login" ><RaisedButton label="Click to Login Instead"  /> </Link >
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
