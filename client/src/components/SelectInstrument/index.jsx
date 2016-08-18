import React from 'react';
import Carousel from 'react-slick';
import StartButton from './StartButton';
import { SelectPiano, SelectDrums, SelectFry } from './Selections';

const Logo = () => (
  <div id="instLogo">
    <img
      src="../../../style/InstrumentRoomLogo.png"
      alt="logo"
    />
  </div>
);

// Note: images need to be the same height
const SelectInstrument = ({ handleClick, handleStart, disabled }) => {
  const multipleSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const centerSettings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
  };

  const imgStyles = {
    width: '640px',
    height: 'auto',
  };

  const clickPiano = handleClick.bind(null, 'piano');
  const clickDrums = handleClick.bind(null, 'drums');
  const clickFry = handleClick.bind(null, 'fry');

  return (
    <section className="carousel selectInstrument">
      <Logo />
      <Carousel {...multipleSettings}>
        <img
          style={imgStyles}
          src="http://placehold.it/640x360/ffffff/c0392b/&text=Piano"
          onClick={clickPiano}
        />
        <img
          style={imgStyles}
          src="http://placehold.it/640x360/ffffff/c0392b/&text=Drums"
          onClick={clickDrums}
        />
        <img
          style={imgStyles}
          src="http://placehold.it/640x360/ffffff/c0392b/&text=Fry"
          onClick={clickFry}
        />
      </Carousel>
      <StartButton disabled={disabled} handleStart={handleStart} />
    </section>
  );
};

SelectInstrument.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};

// SelectInstrument.childContextTypes = {
//   muiTheme: React.PropTypes.object.isRequired,
// };

export default SelectInstrument;
