import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles(theme => ({
  root: {
    width: 300
  },
  margin: {
    height: theme.spacing(3)
  }
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        Always visible
      </Typography>
      <Slider
        defaultValue={500}
        min={500}
        max={5000}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={100}
        valueLabelDisplay="on"
      />
    </div>
  );
}
