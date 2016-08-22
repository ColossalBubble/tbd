import React, { Component } from 'react';
import $ from 'jquery';
import { MembraneSynth } from "tone";
import { showErrorMessage, mapIdsToKeys, mapKeysToIds } from '../utils/helperFunctions';

const io = require('socket.io-client');

const socket = io();

class UserMakeInstrument extends Component {

  constructor(props) {
    super(props);
    this.deleteKey=this.deleteKey.bind(this);
    this.mapThat=this.mapThat.bind(this);
    this.changeInst=this.changeInst.bind(this);
    this.killKeypress=this.killKeypress.bind(this);
    this.addKeypress=this.addKeypress.bind(this);
    this.state = {
      inMemObject: {},
      instrument: "MembraneSynth",
      tryingToName: true,
    };
  }


  componentDidMount() {
    $('.sampleSound').click(() => {
      this.sampleSound();
    });

    $.get("/userLoggedInToMakeInst", (resp, err) => {
      console.log(resp);
      if (resp.length===0){
        console.log('youre not logged in!');
        this.context.router.push("login");
      }
    });
  }

  componentWillUnmount() {
      $(document).off();
      $(document).off("keypress");
  }

  keyHelper(ID) {
    console.log(this.state.tryingToName);
    if (!this.state.tryingToName) {
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
  }

  sampleSound() {
    const par1=$("#par1 option:selected").text();
    const par2=$("#par2 option:selected").text();
    const par3=Number($("#par3").val());
    const par4=$("#par4 option:selected").text();
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
    const par1=$("#par1 option:selected").text();
    const par2=$("#par2 option:selected").text();
    const par3=$("#par3").val();
    const par4=$("#par4 option:selected").text();
    const key = $(".selectKey option:selected").text();
    const inst = $(".selectInst option:selected").text();
    const currentInMemObj = this.state.inMemObject;
    currentInMemObj[key] = [inst, par1, par2, par3, par4];
    if (!par1&&!par2&&!par3&&!par4) {
      console.log('please make a proper mapping');
      showErrorMessage("#makeInstErrorMessages", 'Please make a Proper Mapping', 'propMapError');
    } else {
      $("#par1").val("A");
      $("#par2").val("1");
      $("#par3").val("0.1");
      $("#par4").val("sine");
      this.setState({
        inMemObject: currentInMemObj
      });
    }
  const idToAdd=mapKeysToIds[key];
  console.log('idToAdd', idToAdd);
     $(idToAdd).css("border", "5px solid blue");
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
      $("#par1").val("A");
      $("#par2").val("1");
      $("#par3").val("0.1");
      $("#par4").val("sine");
      $(".key").css("border", "2px solid black");
    }
  }

  deleteKey() {
    const keyToDelete=$(".selectKey option:selected").text();
    console.log('you want to delete'+ $(".selectKey option:selected").text());
    const newInMemObj=this.state.inMemObject;
    delete newInMemObj[keyToDelete];
    this.setState({
      inMemObject: newInMemObj,
     });

  const idToClear=mapKeysToIds[keyToDelete];
  console.log('idToAdd', idToClear);
     $(idToClear).css("border", "2px solid black");
  }

  killKeypress() {
    console.log("keypress should be killed");
    $(document).off();
    $(document).off("keypress");
    this.setState({
      tryingToName: true,
    });
  }

  addKeypress() {
    console.log(this, 'this in addkeypress');
    console.log("keypress should be enabled");
    if (this.state.tryingToName) {
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
       this.setState({
        tryingToName: false,
      });

  }

   
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
        <div id="currentInst" />
        <br />Select an instrument to try out:

        <div className="selectInst" id="selectInstID">
          <form>
            <select onChange={this.changeInst} name="insts">
              <option value="MembraneSynth">MembraneSynth</option>
            </select>
          </form>
        </div>
        <br />
        <div className="selectKey" id="selectKeys_${id}">
           Select a Key to map to:
          <form>
            <select name="keys">
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
        <button onClick={this.deleteKey}> Delete key </button><br /><br />
        Select Some parameters:<br />

        Note: 
        <select className="par" id="par1">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
        </select><br />
        Octave
        <select className="par" id="par2">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="4">5</option>
          <option value="4">6</option>
          <option value="4">7</option>
        </select><br />
        pitchDecay: 
        <select className="par" id="par3">
          <option value="0.1">0.1</option>
          <option value="0.2">0.2</option>
          <option value="0.3">0.3</option>
          <option value="0.4">0.4</option>
          <option value="0.5">0.5</option>
          <option value="0.6">0.6</option>
          <option value="0.7">0.7</option>
          <option value="0.8">0.8</option>
          <option value="0.9">0.9</option>
          <option value="1">1</option>
          <option value="1.1">1.1</option>
          <option value="1.2">1.2</option>
          <option value="1.3">1.3</option>
          <option value="1.4">1.4</option>
          <option value="1.5">1.5</option>
        </select><br />
        Sound Type: 
        <select className="par" id="par4">
          <option value="sine">sine</option>
          <option value="square">square</option>
          <option value="sawtooth">sawtooth</option>
          <option value="triangle">triangle</option>
        </select> <br />
        <button id="sampleSound" className="sampleSound">Sample sound !</button>
        <button onClick={this.mapThat}>Map that</button><br />
        Name that:<input onClick={this.killKeypress} type="text" id="userInstName" /><br /><br /> <br />
        <button style={{ postion: "absolute", top: "50%" }} onClick={this.makeInstrument.bind(this)}>Make the Instrument!</button>
        <br />
        Your current Instrument in JSON form: <br />
        {JSON.stringify(this.state.inMemObject)}<br />
        Your current Instrument in Piano form (click to try it out):
        <div onClick={this.addKeypress} id="testPiano">
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
        <div id="makeInstErrorMessages" />
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
