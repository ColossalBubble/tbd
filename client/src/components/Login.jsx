import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import $ from 'jquery';
import { socket } from '../peer';

class Login extends Component {

  constructor(props, context) {
    super(props);
    context.router;
  }

  componentDidMount() {
    socket.on('BadLogin', msg => {
      console.log(msg);
    });


    socket.on('SuccessLogin', msg => {
      console.log(msg);
      this.context.router.push('/');
    });
  }

  helperLogin() {
    const user=$('#UNLogin').val();
    const pass= $('#UNPass').val();
    console.log(user, pass);
    socket.emit('loginUser', { user: user, pass: pass });
  }

  render() {
    return (
      <div id = "loginContent">
        Username:<TextField id="UNLogin" /><br />
        Password:<TextField id="UNPass" type="password" /><br />
        <RaisedButton label="Login" onClick={() => { this.helperLogin(); }} / >
        <Link to="signup"><RaisedButton label="Click to signup" /></Link>
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
