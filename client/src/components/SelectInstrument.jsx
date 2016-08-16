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

const SelectInstrument = ({ handleClick }) => {
  const settings = {
    dots: true,
    fade: true,
    centerMode: true,
    //className: 'center',
    //infinite: true,
    //centerPadding: '60px',
    //slidesToShow: 3,
    //speed: 500,
  };

  return (
    <section className="carousel">
      <div><Logo /></div>
      <Carousel {...settings}>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
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
