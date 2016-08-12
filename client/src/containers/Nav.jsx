import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class Nav extends Component {

  render() {
    return (
      <div id="navBar">
        <Link to="/">Home</Link>
        <Link to="login">Login</Link>
        <Link to="signup">Signup</Link>
        <Link to="selectInstrument">Select Instrument</Link>
        <Link to="selectRoom">Select Room</Link>
        <Link to="jam">Jam!</Link>
        <FlatButton style={{ position: "relative", left: "85%" }} label="Log In" onClick={() => { this.props.change('login')}} />
        <FlatButton style={{ position: "relative", left: "85%" }} label="Sign In" onClick={() => { this.props.change('signup')}} />
      </div>
    );
  }
}
Nav.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Nav;
