import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
  margin: 12,
};

class LandingPage extends Component {

  render() {
    return (
      <div id='buttonsOnLP'>
        <p id="LPText">Lorem ipsum do est. </p>
         <br />
        <RaisedButton label="Join Room" style={style} onClick={() => { this.props.change('selectInstrument')}} />
        <br /><TextField ref="myField" /><br />
        <RaisedButton label={"Create Room"}  onClick={() => { this.refs.myField.getValue().length===0?null:this.props.change('selectInstrument')}}/>
      </div>
    );
  }
}

LandingPage.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default LandingPage;
