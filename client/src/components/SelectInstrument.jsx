import React from 'react';
import Carousel from 'react-slick';

const Logo = () => (
  <div>
    <img
      id="instLogo"
      src="../../../style/InstrumentRoomLogo.png"
      alt="logo"
    />
  </div>
);

const SelectPiano = ({ handleClick, opacity }) => (
  <div className={opacity('piano')}>
    <img
      id="pianoChoose"
      src="http://handlinpiano2.codyhandlin.com/wp-content/uploads/2016/06/grandepiano_2.png"
      alt="piano"
      onClick={handleClick.bind(null, 'piano')}
    />
  </div>
);

const SelectDrums = ({ handleClick, opacity }) => (
  <div className={opacity('drums')}>
    <img
      id="drumsChoose"
      src="http://www.vancouvertop40radio.com/Images/Clip%20Art/drumset.gif"
      alt="drums"
      onClick={handleClick.bind(null, 'drums')}
    />
  </div>
);

const SelectFry = ({ handleClick, opacity }) => (
  <div className={opacity('fry')}>
    <img
      id="fryChoose"
      src="http://i.stack.imgur.com/STEuc.png"
      alt="fry"
      onClick={handleClick.bind(null, 'fry')}
    />
  </div>
);

const SelectInstrument = ({ handleClick, opacity }) => {
  const settings = {
    dots: true,
    centerMode: true
  };

  return (
    <div id="selectInstrumentRoom">
      <Carousel {...settings}>
        <div><Logo /></div>
        <div><SelectPiano handleClick={handleClick} opacity={opacity} /></div>
        <div><SelectDrums handleClick={handleClick} opacity={opacity} /></div>
        <div><SelectFry   handleClick={handleClick} opacity={opacity} /></div>
      </Carousel>
    </div>
  );
};

SelectInstrument.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
  opacity: React.PropTypes.func
};

// SelectInstrument.childContextTypes = {
//   muiTheme: React.PropTypes.object.isRequired,
// };

export default SelectInstrument;
