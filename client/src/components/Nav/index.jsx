import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import $ from "jquery";
import NavMenuIcon from './NavMenuIcon';

class AppNavBar extends Component {
  constructor(props, context) {
    super(props);
    this.logIn = this.props.logIn.bind(this);
    this.logOut = this.props.logOut.bind(this);
    this.clearSessions = this.clearSessions.bind(this);
    this.FBAuth = this.FBAuth.bind(this);
    console.log("this.props.user", this.props.user);
  }

  clearSessions() {
    $.get("/logout", (resp, err) => {
      this.logOut();
    });
  }

  FBAuth(e) {
    e.preventDefault();
    const linkTag = $('<a href="/auth/facebook"></a>');
    linkTag[0].click();
  }

  render() {
    // console.log('tpu', this.props.userInstruments);
    return (
      <div className="nav">
        <AppBar
          showMenuIconButton={false}
          title="tbd"
          titleStyle={{ color: '#E8AEB7' }}
          onTitleTouchTap={() => { this.context.router.push('/'); }}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', height: '100%' }}
          iconElementRight={
            <NavMenuIcon
              id="menuicon"
              loggedIn={this.props.loggedIn}
              clearSessions={this.clearSessions}
              FBAuth={this.FBAuth}
            />
          }
        />
      </div>
    ); }
  }

AppNavBar.contextTypes = {
  router: React.PropTypes.object
};

AppNavBar.propTypes = {
  title: React.PropTypes.string,
  loggedIn: React.PropTypes.bool,
  user: React.PropTypes.string,
  logOut: React.PropTypes.func,
  logIn: React.PropTypes.func,
};

export default AppNavBar;
