import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const StartButton = ({ handleStart, disabled }) => {
  return (
    <RaisedButton
     label="Start"
     onClick={handleStart}
     disabled={disabled}
    />
  );
};

export default StartButton;
