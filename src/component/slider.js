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

  const handleSliderChange = (event, newValue) => {
    props.changeSlider(newValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        min={props.min}
        max={props.max}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={props.step}
        // valueLabelDisplay="on"
        onChange={handleSliderChange}
        value={props.value}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  );
}
