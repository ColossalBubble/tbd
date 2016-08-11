import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

class LandingPage extends Component {

  render() {
    return (
      <div id="roche">
        WELCOME TO TBD! <br />
<<<<<<< HEAD
        <button onClick={() => { this.props.change('selectInstrument') }}>Join Room </button><br />
        <input type="text" /><br />
        <button onClick={() => { this.props.change('selectInstrument') }}>Create Room </button><br />
=======
        <RaisedButton label="Join Room" style={style} onClick={() => { this.props.change('selectInstrument')}} />
        <br /><TextField /><br />
        <RaisedButton label="Create Room" onClick={() => { this.props.change('selectInstrument')}} />
>>>>>>> 3268a010c599d7bf7f534e875dbb6d8be001edb7
      </div>
    );
  }
}

LandingPage.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default LandingPage;
