import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import styleActions from '../styles/actionarea';

const useStyles = makeStyles(styleActions);
function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}
ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DiscreteSlider(props) {
  const classes = useStyles();
  const { min, max, value, context, step, changeSlider, calculateInterest } = props.data;

  return (
    <div className={classes.sliderRoot}>
      <Slider
        min={min}
        max={max}
        aria-labelledby="discrete-slider-always"
        step={step}
        onChange={(e,value) => changeSlider(value)}
        onChangeCommitted={(e,value) => calculateInterest(value, context)}
        value={value}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  );
}

