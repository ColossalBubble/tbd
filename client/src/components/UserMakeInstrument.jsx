import React, { Component } from 'react';
import $ from 'jquery';
const io = require('socket.io-client');
const socket = io();
import { Link } from 'react-router';
import store from '../instruments/store';
import TextField from 'material-ui/TextField';



class UserMakeInstrument extends Component {

constructor(props, context) {
    super(props);
    context.router;
    this.i = 1;

     this.state = {
      test:5,
      inMemObject:{},
      instrument:"piano",
    };
  
  }


  componentDidMount() {
    console.log('mounted@!!!')
    let i;
    for (i = 0; i < 1; i++) {
      $('.sampleSound').click(()=>{this.sampleSound()});
    }
    console.log('youre about to make your own instrument!');
  }


  sampleSound() {
    console.log("you should now here your uploaded sound");
  }

  mapThat() {
   
    const key = $(".selectKey option:selected").text();
    const inst = $(".selectInst option:selected").text();
    var currentInMemObj = this.state.inMemObject;
    currentInMemObj[key] = [inst, $("#par1").val(), $("#par2").val(), $("#par3").val()];
     $(".par").val("");
    console.log('key', key);
    this.setState({
      test: Math.random(),
      inMemObject: currentInMemObj
    })

    console.log('inst after mapping', this.state.inMemObject);
  }


  makeInstrument() {
    const name = $("#userInstName").val()
    const key = $(".selectKey option:selected").text();

    var currentInMemObj = this.state.inMemObject;
    currentInMemObj['name'] = name;
    currentInMemObj['userName'] = this.props.user;

    this.setState({
      inMemObject: {}
    })

    socket.emit('newInstCreated', currentInMemObj);
    console.log("you've created " + JSON.stringify(currentInMemObj));
  }

changeInst(){
  console.log("inst changed")
 const inst=$(".selectInst option:selected").text()
 this.setState({
  instrument:inst
 });
}


  render() {
    console.log(this.props.user,'user in the house!!!!!',this.inMemObject);
    
    return (
    
      <div id="UserMakeInstrumentRoom">
      <h1>Make Instrument here!</h1>
      Your current Instrument {this.state.instrument} in JSON.stringify form:<br/>
      {JSON.stringify(this.state.inMemObject)}
      
      <br/>Select an instrument to try out: 

      <div className="selectInst" id="selectInstID"> 
          <form>
            <select onChange={this.changeInst.bind(this)} name="insts">
              <option  value="Piano">Piano</option>
              <option value="Fry">Fry</option>
            </select>
          </form>
      </div>

<br/>
<div className="selectKey" id="selectKeys_${id}"> 
          Select a Key to map to:<form>
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
Select Some parameters:

<br/>

        {this.state.instrument}Param1: <input className="par" id="par1" type="text"  /><br/>
        {this.state.instrument}Param2: <input className="par" id="par2" type="text"  /><br/>
        {this.state.instrument}Param3: <input className="par" id="par3"  type="text"  /><br/>
        {this.state.instrument}Param4: <input className="par" id="par4" type="text"  /> <br/>
        <button id ="sampleSound" className='sampleSound'>Sample sound !</button>
        <button onClick={this.mapThat.bind(this)}>Map that</button><br/>
       
       <TextField floatingLabelText="Name Your Instrument" id='userInstName' /><br /><br /> <br />
        <button style={{postion:"absolute",top:"50%"}} onClick={this.makeInstrument.bind(this)}>Make the Instrument!</button>

      <br/>

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
