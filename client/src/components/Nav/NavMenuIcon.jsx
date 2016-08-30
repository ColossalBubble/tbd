import React from 'react';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// How to wrap `MenuItem` components inside of `Link` components without warnings?
// https://github.com/callemall/material-ui/issues/4899
const NavMenuIcon = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }

    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    className="menu"
  >
    {!props.loggedIn?<MenuItem
      primaryText="Login"
      containerElement={<Link to="/login" />}
    />:null}
    {!props.loggedIn?<MenuItem
      primaryText="Sign up"
      containerElement={<Link to="/signup" />}
    />:null}
    {!props.loggedIn?<MenuItem
      primaryText="LI with facebook!"
      onClick={props.FBAuth}
    />:null}
    {props.loggedIn?<MenuItem
      onClick={props.clearSessions}
      primaryText="Signout!"
      containerElement={<Link to="/" />}
    />:null}
    {props.loggedIn?<MenuItem
      primaryText="Make your own instrument!"
      containerElement={<Link to="/MakeInstrument" />}
    />:null}
    <Divider />
    <MenuItem
      primaryText="About"
      containerElement={<Link to="/about" />}
    />
  </IconMenu>
);

NavMenuIcon.propTypes = {
  loggedIn: React.PropTypes.bool,
  FBAuth: React.PropTypes.func,
  clearSessions: React.PropTypes.func,
};

export default NavMenuIcon;
