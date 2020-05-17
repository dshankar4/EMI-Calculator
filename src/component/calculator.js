import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Calculator(props) {
    return(
      <div>
        <Typography variant="h5">Monthly EMI : $ {props.details.amount}</Typography>
        <Typography variant="h5">Interest Rate : {props.details.interest}%</Typography>
      </div>
    )
}




