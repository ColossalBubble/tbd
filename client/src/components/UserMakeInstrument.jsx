import React, { Component } from 'react';
import $ from 'jquery';
import { showErrorMessage } from '../utils/helperFunctions';
import store from '../instruments/store';
import TextField from "material-ui/TextField";
import { MembraneSynth } from "tone";

const io = require('socket.io-client');

const socket = io();

class UserMakeInstrument extends Component {

  constructor(props, context) {
    super(props);
    this.deleteKey=this.deleteKey.bind(this);
    this.mapThat=this.mapThat.bind(this);
    this.changeInst=this.changeInst.bind(this);
    this.state = {
      inMemObject: {},
      instrument: "MembraneSynth",
    };
  }


  componentDidMount() {
    let i;
    for (i = 0; i < 1; i++) {
      $('.sampleSound').click(() => {
        this.sampleSound();
      });
    }
    $(document).keypress((e) => {
  console.log(e.which);
  if (e.which === 97) {
    this.keyHelper("#1");
  } else if (e.which=== 115) {
     this.keyHelper("#2");
  } else if (e.which=== 100) {
     this.keyHelper("#3");
  } else if (e.which=== 102) {
     this.keyHelper("#4");
  } else if (e.which=== 103) {
     this.keyHelper("#5");
  } else if (e.which=== 104) {
     this.keyHelper("#6");
  } else if (e.which=== 106) {
     this.keyHelper("#7");
  } else if (e.which=== 107) {
     this.keyHelper("#8");
  } else if (e.which=== 108) {
     this.keyHelper("#9");
  }
  });
}

  keyHelper(ID) {

    const mapIdsToKeys={
      '#1': 'A',
      '#2': 'S',
      '#3': 'D',
      '#4': 'F',
      '#5': 'G',
      '#6': 'H',
      '#7': 'H',
      '#8': 'K',
      '#9': 'L',
    };

    const keyInfo=this.state.inMemObject[mapIdsToKeys[ID]];
    console.log('keyinfo', keyInfo);
    $("#par1").val(keyInfo[1]);
    $("#par2").val(keyInfo[2]);
    $("#par3").val(keyInfo[3]);
    $("#par4").val(keyInfo[4]);
    this.sampleSound();

    $(ID).animate({
      backgroundColor: "black",
    }, 20).animate({
      backgroundColor: "white",
    }, 20);
  }

  sampleSound() {
    const par1=$("#par1").val();
    const par2=$("#par2").val();
    const par3=Number($("#par3").val());
    const par4=$("#par4").val();
    const combo= `${par1}${par2}`;
    const inst = $(".selectInst option:selected").text();
    console.log(`play a ${combo} sound on the ${inst}`);
    const config = {
            pitchDecay: par3||0.1,
            octaves: 7,
            oscillator: {
              type: par4,
            },
            envelope: {
              attack: 0.001,
              decay: 0.1,
              sustain: 0.1,
              release: 2,
              attackCurve: 'linear'
            }
          };
    const zimit = new MembraneSynth(config).toMaster();
    zimit.triggerAttackRelease(combo, '8n');
  }

  mapThat() {
    const par1=$("#par1").val();
    const par2=$("#par2").val();
    const par3=$("#par3").val();
    const par4=$("#par4").val();
    const key = $(".selectKey option:selected").text();
    const inst = $(".selectInst option:selected").text();
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj[key] = [inst, par1, par2, par3, par4];
    if (!par1&&!par2&&!par3&&!par4) {
      console.log('please make a proper mapping');
      showErrorMessage("#makeInstErrorMessages", 'Please make a Proper Mapping', 'propMapError');
    } else {
      $(".par").val("");
      this.setState({
        inMemObject: currentInMemObj
      });
    }
  }


  makeInstrument() {
    const name = $("#userInstName").val();
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj.name = name;
    currentInMemObj.userName = this.props.user;
    let empty = true;
    for (const key in currentInMemObj) {
      if (key.length===1) {
        console.log('a key exists!');
        empty = false;
      }
    }
    if (name.length === 0) {
      showErrorMessage("#makeInstErrorMessages", 'Pls name your instrument', 'npo');
      console.log('you need to name it something!');
    } else if (empty) {
      showErrorMessage("#makeInstErrorMessages", 'Pls map some keys', 'npi');
      console.log('youve not mapped any keys!!!');
    } else {
      this.setState({
        inMemObject: {}
      });
      empty = true;
      socket.emit('newInstCreated', currentInMemObj);
      console.log("you've created " + JSON.stringify(currentInMemObj));
      const final = this.props.userInstruments.concat([currentInMemObj]);
      this.props.updateUserInstrument(final);
      showErrorMessage("#makeInstErrorMessages", 'InstrumentMade!', 'makeThat');
    }
  }

  deleteKey() {
    var keyToDelete=$(".selectKey option:selected").text();
    console.log('you want to delete'+ $(".selectKey option:selected").text());
    var newInMemObj=this.state.inMemObject;
    delete newInMemObj[keyToDelete];
    this.setState({
      inMemObject: newInMemObj,
     });
  }
  changeInst() {
    console.log("inst changed");
    $(".par").val("");
    const inst = $(".selectInst option:selected").text();
    this.setState({
      instrument: inst
    });
  }


  render() {

    console.log(this.props.userInstruments);
    return (
      <div id="UserMakeInstrumentRoom">
        <h1>Make Instrument here!</h1>
        <div id='currentInst'> </div>
      Your current Instrument: <br />
      {JSON.stringify(this.state.inMemObject)}
        <br />Select an instrument to try out:

        <div className="selectInst" id="selectInstID">
          <form>
            <select onChange={this.changeInst} name="insts">
              <option value="MembraneSynth">MembraneSynth</option>
              <option value="Fry">Fry</option>
            </select>
          </form>
        </div>
        <br />
        <div className="selectKey" id="selectKeys_${id}">
           Select a Key to map to:
          <form>
            <select name="cars">
              <option value="A">A</option>
              <option value="S">S</option>
              <option value="D">D</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>
            </select>
          </form>
        </div>
        <button onClick={this.deleteKey}> Delete key </button>
        Select Some parameters:<br />

        {this.state.instrument} Note: <input placeholder="A-6"className="par" id="par1" type="text" /><br />
        {this.state.instrument} Octave <input placeholder="1-7" className="par" id="par2" type="text" /><br />
        {this.state.instrument} pitchDecay: <input placeholder="0-50" className="par" id="par3" type="text" /><br />
        {this.state.instrument} Sound Type: <input placeholder="sine, square, sawtooth,triangle" className="par" id="par4" type="text" /><br />

        <button id="sampleSound" className="sampleSound">Sample sound !</button>
        <button onClick = {this.mapThat}>Map that</button><br />
        <input type="text" id='userInstName' />INPUT SHOULD BE HERE!<br /><br /> <br />
        <button style={{ postion: "absolute", top: "50%" }} onClick={this.makeInstrument.bind(this)}>Make the Instrument!</button>
        <br />
        <div id="makeInstErrorMessages" />
            <div>
        <div className="key" id="1" >A</div>
        <div className="key" id="2" >S</div>
        <div className="key" id="3" >D</div>
        <div className="key" id="4" >F</div>
        <div className="key" id="5" >G</div>
        <div className="key" id="6" >H</div>
        <div className="key" id="7" >J</div>
        <div className="key" id="8" >K</div>
        <div className="key" id="9" >L</div>
      </div>
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
