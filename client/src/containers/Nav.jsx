import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';

class Nav extends Component {

  render() {
    return (
      <div id="navBar">
        <FlatButton style={{display:"inline",backgroundColor:"brown",left:"1150px",border:"2px solid black"}} className="logInButton" label="Log In" onClick={() => { this.props.change('login')}} />
        <FlatButton style={{display:"inline",backgroundColor:"brown",left:"1150px",border:"2px solid black"}}  label="Sign In" onClick={() => { this.props.change('signup')}} />
      <h1 style={{display:"inline",bottom:"450px"}}>App Logo Here</h1>
      </div>
    );
  }
}
Nav.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default Nav;
