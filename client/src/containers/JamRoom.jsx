
import React, { Component } from 'react';
import UserInstrument from './UserInstrument';
import FriendInstrument from './FriendInstrument';

class JamRoom extends Component {

  render() {
    return (
      <div id="jamroom">
        <h1>Welcome to the JamRoom!</h1>
        <div id="friendMesh">
          <FriendInstrument />
          <FriendInstrument /><br />
          <FriendInstrument />
          <FriendInstrument />
        </div>
        <UserInstrument inst={this.props.inst} />
      </div>
    );
  }
}

export default JamRoom;
