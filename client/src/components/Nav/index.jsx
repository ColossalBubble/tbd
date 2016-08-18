import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import $ from "jquery";

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };

class AppNavBar extends Component {

  constructor(props, context) {
    super(props);
    context.router;
    this.logIn=this.props.logIn.bind(this);
    this.logOut=this.clearSessions.bind(this);
  }

  componentDidMount() {
      $.get("/fbLoggedIn?", (response, err) => {
        console.log(response);
        if (response==="true") {
          this.logIn();
        }
      });
  }

  clearSessions() {
    $.get("/logout", (a, b) => {
      this.props.logOut();
    });
  }

  render() {
    return (
      <div id="navBar">
        <AppBar
          style={color}
          showMenuIconButton={false}
        >
         {this.props.user.length?<div id="Welcome"> Hello {this.props.user}!</div>:null}
          <Link to="/">
            <img id="logo" src="http://bit.ly/2beSCQg" />
          </Link>
          {this.props.loggedIn?null:<a href="/auth/facebook"><button onClick={this.logIn} className="navButtons"> Login with FB!</button></a>}
          {this.props.loggedIn?null:<Link to="login" ><button className="navButtons"> Login!</button></Link>}
          <Link to="MakeInstrument"><button className="navButtons"> Make your own instrument!</button></Link>
          {!this.props.loggedIn?null:<Link to="/"><button onClick={this.logOut} className="navButtons"> SignOut!</button></Link>}
          {this.props.loggedIn?null:<Link to="signup"><button className="navButtons"> Signup!</button></Link>}
        </AppBar >
      </div>
    ); }
  }

AppNavBar.contextTypes = {
  router: React.PropTypes.object
};

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
