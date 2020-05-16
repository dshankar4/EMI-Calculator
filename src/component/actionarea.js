import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Calculator from './calculator';
import Slider from './slider';
import api from '../api';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));  
export default function ActionArea(props){
    const classes = useStyles();
    const [amount, setAmount] = React.useState(500);
    const [tenure, setTenure] = React.useState(6);
    const [monthlyPayment, setMonthlyPayment] = React.useState({
        amount: 0, interest: 0
    })
    const handleChangeAmount = (event) => {
        console.log("changed", event.target.value)
        setAmount(event.target.value === '' ? '' : Number(event.target.value));
    };
    const changeSliderValue = (value) => {
        setAmount(value)
    }
    const handleChangeTenure = (event) => {
        console.log("changed", event.target.value)
        setTenure(event.target.value === '' ? '' : Number(event.target.value));
     };

    const changeSliderTenure = (value) => {
        setTenure(value)
    }

    useEffect(() => {
        if((amount >= 500 && amount <= 5000) && (tenure >= 6 && tenure <= 24)) {
            api.emi.calculateInterest(amount, tenure).then(res => {
                console.log(res, "changed")
                const { interestRate } = res
                const { amount } = res.monthlyPayment
                setMonthlyPayment({ amount: amount,interest: interestRate})
            })
        }
    }, [amount, tenure])
    
    return(
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item>
        <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-name"
            label="Loan Amount"
            value={amount}
            onChange={handleChangeAmount}
            variant="outlined"
          />
        </div>
    <Slider min={500} max={5000} step={100} value={amount} changeSlider={changeSliderValue}/>
    <div>
          <TextField
            id="outlined-name"
            label="Loan Tenure"
            value={tenure}
            onChange={handleChangeTenure}
            variant="outlined"
          />
        </div>
    <Slider min={6} max={24} step={1} value={tenure} changeSlider={changeSliderTenure}/>
      </form>
        </Grid>
        <Grid item>
        <Calculator details={monthlyPayment} />
        </Grid>
    </Grid>
  );
}




