// Modules
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

// Components
import SelectInstrument from '../components/SelectInstrument';
import JamRoom from '../components/JamRoom';

// Util
import connectionManager from '../rtc';
import store from '../instruments/store';

const io = require('socket.io-client');

const socket = io();

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: connectionManager.isConnected,
      instrument: null,
      startJam: false
    };

    this.updateConnection = this.updateConnection.bind(this);
    this.selectInstrument = this.selectInstrument.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  componentDidMount() {
    connectionManager.setup(this.props.params.roomId);
    connectionManager.onStatusChange(this.updateConnection);
    connectionManager.onMessage(data => {
      data = JSON.parse(data);
      store[data.instrument](data.keyPressed);
    });

    socket.on('invalid room', () => {
      this.context.router.push('/invalid');
    });
 
    // event listener for keydown
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    connectionManager.offStatusChange(this.updateConnection);
    window.removeEventListener('keydown', this.handleKeydown);
    connectionManager.closeConnection();
  }

  updateConnection() {
    this.setState({ connected: connectionManager.isConnected });
  }

  selectInstrument(instrument) {
    this.setState({ instrument });
  }

  handleKeydown(e) {
    connectionManager.sendMessage(JSON.stringify({
      instrument: this.state.instrument,
      keyPressed: e.key
    }));
    store[this.state.instrument](e.key);
  }

  handleStart() {
    this.setState({ startJam: true });
  }

  render() {
    const opacity = instrument => classnames({ selected: this.state.instrument === instrument }, 'instrument');
    return (
      <div>
        {
          this.state.startJam ?
            <JamRoom instrument={this.state.instrument} peers={this.state.peerConnections} />:
            <div>
              <SelectInstrument handleClick={this.selectInstrument} opacity={opacity} />
              <RaisedButton
                style={{ bottom: 0, position: "absolute" }}
                label="Start"
                style={{ bottom: '0', position: 'absolute' }}
                onClick={this.handleStart}
                disabled={!this.state.connected || !this.state.instrument}
              />
            </div>
        }
      </div>
    );
  }
}

Room.propTypes = {
  params: React.PropTypes.object
};

Room.contextTypes = {
  router: React.PropTypes.object
};

export default Room;

