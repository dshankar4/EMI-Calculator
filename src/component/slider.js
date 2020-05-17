import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function valuetext(value) {
  return `${value}`;
}
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
    <div className={classes.root}>
      <Slider
        min={min}
        max={max}
        getAriaValueText={valuetext}
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
