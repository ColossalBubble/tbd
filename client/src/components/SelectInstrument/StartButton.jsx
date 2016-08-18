import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const StartButton = ({ handleStart, disabled }) => {
  const buttonStyles = {
    position: 'absolute',
    left: '45%',
    top: '50%'
  };

  return (
    <RaisedButton
     style={buttonStyles}
     label="Start"
     onClick={handleStart}
     disabled={disabled}
    />
  );
};

export default StartButton;
