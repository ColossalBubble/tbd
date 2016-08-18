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

// Note: images need to be the same height
const SelectInstrument = ({ handleClick }) => {
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
    outline: '1px dashed black',
  };

  const clickPiano = handleClick.bind(null, 'piano');
  const clickDrums = handleClick.bind(null, 'drums');
  const clickFry = handleClick.bind(null, 'fry');

  return (
    <section className="carousel">
      <div><Logo /></div>
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
