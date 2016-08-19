import React, { Component } from 'react';
import $ from 'jquery';
const io = require('socket.io-client');
const socket = io();
import { Link } from 'react-router';
import { addKeyHelper } from '../utils/helperFunctions';
import store from '../instruments/store';




class UserMakeInstrument extends Component {

constructor(props, context) {
    super(props);
    context.router;
    this.i = 1;
    this.activatePiano=this.activatePiano.bind(this);
    this.activateFry=this.activateFry.bind(this);
    this.addKey=this.addKey.bind(this);
  }


  componentDidMount() {
    console.log('mounted@!!!')
    let i;
    for (i = 0; i < 1; i++) {
      addKeyHelper(this.i);
      $('.sampleSound').click(()=>{this.sampleSound()});

    }
    console.log('youre about to make your own instrument!');
  }


  addKey() {
    function sampleSound(){
      console.log("should play sound");
    }

    console.log(this.i);
    if (this.i > 12) {
      console.log("Too many keys")
    } else {
      $(".sampleSound")
      .off("click");
      addKeyHelper(this.i);
      this.i++;
      $('.sampleSound').click(()=>{this.sampleSound()});
    }
  }

sampleSound(){
  console.log("you should now here your uploaded sound");
}

activatePiano(){
   console.log('run av piano');
  function test(e){console.log(e);store['piano'](e)};
  $(document).off();
  $(document).off("keydown", test);
  $(document).on("keydown", test);
}

activateFry(){
  console.log('run av fry');
  function test(e){console.log(e);store['fry'](e)};
  $(document).off();
  $(document).off("keydown", test);
  $(document).on("keydown", test);
}
  
  makeInstrument() {
    var name= $("#userInstName").val()
    var inMemObject = {name:}
    var repeat = false;
    const keys = $(".selectKey option:selected").text();

    keys.split('').forEach((key) => {
      if (inMemObject[key]) {
        repeat = true;
      } else {
        inMemObject[key] = 'A particular sound or set of args for piano/fry to play';
      }
    });

    repeat ? null : socket.emit('newInstCreated', repeat ? "repeated keys!" : inMemObject)
    console.log(repeat ? "repeated keys!" : "you've created " +JSON.stringify(inMemObject) );

  }



  render() {
    return (
    
      <div id="UserMakeInstrumentRoom">
      <br/>Select an instrument to try out: 
      <button onClick={this.activatePiano}> Piano </button>
      <button onClick={this.activateFry}> Fry </button>

      <h1>Make Instrument here!</h1>
      Name your instrument:<input id='userInstName'/>
         <button onClick={this.addKey}>Add another key!</button>
      <button style={{postion:"absolute",top:"50%"}} onClick={this.makeInstrument.bind(this)}>Make the Instrument!</button>

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
