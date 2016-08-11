import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        Username:<input type="text" /><br />
        Pass:<input type="password" /><br />
          <button onClick={() =>{ this.props.change('SelectRoom') }}>Login</button>
          <button onClick={() =>{ this.props.change('SelectRoom') }}>Click to signup</button>
=======
        Username:<TextField /><br />
        Password:<TextField type="password" /><br />
        <RaisedButton label="Login" onClick={() => { this.props.change('SelectRoom')}} />
        <RaisedButton label="Click to signup" onClick={() => { this.props.change('SelectRoom')}} />
>>>>>>> 3268a010c599d7bf7f534e875dbb6d8be001edb7
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default Login;
