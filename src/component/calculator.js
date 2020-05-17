import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Calculator(props) {
    return(
      <div>
        <Typography variant="h4">Interest Rate : {props.details.interest}%</Typography>
        <Typography variant="h4">Monthly EMI : {props.details.amount}</Typography>
      </div>
    )
}




