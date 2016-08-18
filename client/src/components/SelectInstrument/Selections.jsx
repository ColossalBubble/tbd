import React from 'react';

const SelectPiano = ({ handleClick }) => (
  <div id="pianoChoose">
    <img
      src="http://handlinpiano2.codyhandlin.com/wp-content/uploads/2016/06/grandepiano_2.png"
      alt="piano"
      onClick={handleClick.bind(null, 'piano')}
    />
  </div>
);

const SelectDrums = ({ handleClick }) => (
  <div id="drumsChoose">
    <img
      src="http://www.vancouvertop40radio.com/Images/Clip%20Art/drumset.gif"
      alt="drums"
      onClick={handleClick.bind(null, 'drums')}
    />
  </div>
);

const SelectFry = ({ handleClick }) => (
  <div id="fryChoose">
    <img
      src="http://i.stack.imgur.com/STEuc.png"
      alt="fry"
      onClick={handleClick.bind(null, 'fry')}
    />
  </div>
 );

export {
  SelectPiano,
  SelectDrums,
  SelectFry,
};
