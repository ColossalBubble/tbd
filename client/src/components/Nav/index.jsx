import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';
import $ from "jquery";

const color={ backgroundImage: 'url("http://bit.ly/2b2ePzs")', width: "100%", opacity: 0.6 };


const AppNavBar = () => (

  <div id="navBar">
    <AppBar
      style={color}
      showMenuIconButton={false}
    >
      <Link to="/">
        <img id="logo" src="http://bit.ly/2beSCQg" />
      </Link>
      <Link to="/login" ><button className="navButtons"> Login!</button>
      </Link>
      <Link to="/signup"><button className="navButtons"> Signup!</button>
      </Link>
    </AppBar >
  </div>
);

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
