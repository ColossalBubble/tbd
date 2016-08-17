import AppBar from 'material-ui/AppBar';
import React from 'react';
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
      <a href="/auth/facebook"><button className="navButtons"> Login with FB!</button></a>
      <Link to="login" ><button className="navButtons"> Login!</button></Link>
      <Link to="MakeInstrument"><button className="navButtons"> Make your own instrument!</button></Link>
      <Link to="/"><button onClick={clearSessions} className="navButtons"> SignOut!</button></Link>
      <Link to="signup"><button className="navButtons"> Signup!</button>
      </Link>
    </AppBar >
  </div>
);


function clearSessions() {
  $.get("/logout", (a, b) => {
    console.log("logged out")
    });
}


function FB() {
  $.get('/auth/facebook', (a, b) => {
    console.log("FB AUTH initiated (?)");
    });
}

AppNavBar.contextTypes = {
  router: React.PropTypes.object
};

AppNavBar.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default AppNavBar;
