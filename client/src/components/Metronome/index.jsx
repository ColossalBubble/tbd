import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import { Loop, Transport } from 'tone';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 60,
      loop: null
    };

    this.changeTempo = this.changeTempo.bind(this);
    this.tick = this.tick.bind(this);
  }

  changeTempo(_event, value) {
    this.setState({ tempo: value });
    this.tick(value);
  }

  tick(tempo) {
    const interval = '4n'; // quarter note

    const newLoop = new Loop(time => {
      // console.log(time);
    }, interval);

    const loop = this.state.loop;
    // if metronome is active, then stop it
    if (loop && loop.state === 'started') {
      loop.cancel(0);
      loop.dispose();
    }

    this.setState({ loop: newLoop });

    this.state.loop.start(0);
    Transport.bpm.value = tempo;
    Transport.start();
  }

  render() {
    const tempo = this.state.tempo;
    const changeTempo = this.changeTempo;

    return (
      <Paper>
        <h1>Metronome</h1>
        <Slider
          defaultValue={tempo}
          description="Change the tempo"
          min={40}
          max={240}
          step={2}
          onChange={changeTempo}
          value={61}
        />
        Tempo: { tempo } bpm
      </Paper>
    );
  }
}

export default Metronome;
