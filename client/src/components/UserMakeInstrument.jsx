import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import { socket } from '../peer';
import sound from '../instruments/sounds/wimbal';
import {test} from '../instruments/sounds/wimbal';









class UserMakeInstrument extends Component {

  constructor(props, context) {
    super(props);
    context.router;
  }

  componentDidMount() {
    for (var i=0;i<6;i++){
  $("#UserMakeInstrumentRoom").append(`<div id="selectKeys_${i}"> <form>
    <select name="cars">
    <option value="Q">Q</option>
    <option value="W">W</option>
    <option value="E">E</option>
    <option value="R">R</option>
    <option value="T">T</option>
     <option value="Y">Y</option>
  </select>
</form>

  <form>
  <input id="key_${i}" type="file" name="pic" accept="audio/*" />
 
  </form> </div>`);
}
   console.log('youre about to make your own instrument!');
  }

  render() {
    return (
      <div id = "UserMakeInstrumentRoom">
        Select a Key--- Select a Sound
<button>Select!</button>
      </div>
    );
  }
}






UserMakeInstrument.propTypes = {
  params: React.PropTypes.object
};

UserMakeInstrument.contextTypes = {
  router: React.PropTypes.object
};


UserMakeInstrument.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
export default UserMakeInstrument;
