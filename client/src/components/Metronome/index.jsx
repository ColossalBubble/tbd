import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import { Transport } from 'tone';
import StartStopButton from './StartStopButton';
import tick from '../../instruments/sounds/tick';

class Metronome extends Component {
  constructor(props) {
    super(props);

    const bpm = 60;
    const interval = '4n'; // quarter note
    Transport.bpm.value = bpm;

    this.state = {
      bpm,
      interval,
      transport: Transport,
      loop: tick()
    };

    this.changeBPM = this.changeBPM.bind(this);
    this.toggle = this.toggle.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    console.log(this.state.bpm);
  }

  start() {
    console.log('pressed start');
    this.state.transport.start();
    this.state.loop.start();
  }

  stop() {
    console.log('pressed stop');
    this.state.transport.stop();
    this.state.loop.stop();
  }

  changeBPM(_event, value) {
    this.setState({ bpm: value });
    Transport.bpm.value = value;
  }

  toggle() {
    const transport = this.state.transport;

    console.log(transport.state);

    if (transport.state !== 'started') {
      this.start();
    } else {
      this.stop();
    }
  }

  render() {
    const bpm = this.state.bpm;
    const changeBPM = this.changeBPM;
    const toggle = this.toggle;

    return (
      <Paper>
        <h1>Metronome</h1>
        <Slider
          defaultValue={bpm}
          description="Change the tempo"
          min={40}
          max={240}
          step={2}
          onChange={changeBPM}
          value={61}
        />
        Tempo: { bpm } bpm
        <br />
        <StartStopButton toggle={toggle} />
      </Paper>
    );
  }
}

export default Metronome;
