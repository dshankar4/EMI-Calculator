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

export default function DiscreteSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.changeSlider(newValue)
  };

  return (
    <div className={classes.root}>
      <Slider
        // defaultValue={500}
        min={props.min}
        max={props.max}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={props.step}
        valueLabelDisplay="on"
        onChange={handleSliderChange}
        value={props.value}
      />
    </div>
  );
}
