import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

export default function Calculator(props) {
    return(
      <div>
        <Divider />
        <Typography variant="h4">Interest Rate : {props.details.interest}%</Typography>
        <Typography variant="h5">Monthly EMI : {props.details.amount}</Typography>
      </div>
    )
}

