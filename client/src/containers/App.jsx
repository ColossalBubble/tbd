import React, { Component } from 'react';
import { Link } from 'react-router';
// for future material ui use
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleRoom = this.toggleRoom.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.toggleInstrument=this.toggleInstrument.bind(this);

    this.state = {
      view: "LandingPage",
      // view: "JamRoom",
      instrument: "start",
      roomType: "start",
      roomId: "start",
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  toggleInstrument(inst) {
    this.setState({
      instrument: inst,
    });
  }

  toggleView(viewChange) {
    this.setState({
      view: viewChange,
    });
  }

  toggleRoom(roomType, RoomId) {
    this.setState({
      roomType,
      RoomId: RoomId ? this.state.RoomId : RoomId,
      view: "selectInstrument",
    });
  }

  render() {
    return (
      <div>
        <Nav />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

// For material ui
App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;
