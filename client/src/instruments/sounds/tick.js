import { Loop, MembraneSynth } from 'tone';

const beat = new MembraneSynth({
  envelope: {
    sustain: 0,
    attack: 0.02,
    decay: 0.8
  },
  octaves: 10
}).toMaster();

const tick = (interval) => (
  new Loop(time => {
    beat.triggerAttackRelease('C2', '4n', time);
  }, interval).start()
);

export default tick;
