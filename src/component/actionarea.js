import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Pie } from 'react-chartjs-2';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from "@material-ui/core/Divider";
import styleActions from '../styles/actionarea';
import Calculator from './calculator';
import Slider from './slider';
import api from '../api';

const useStyles = makeStyles(styleActions);
export default function ActionArea(props){
  // Hooks
  const classes = useStyles();
  const [amount, setAmount] = React.useState(500);
  const [tenure, setTenure] = React.useState(6);
  const [monthlyPayment, setMonthlyPayment] = React.useState({
      amount: 0, interest: 0
  })
  //Events
  useEffect(() => {
    const { cache } = props;
    if(cache) {
      setAmount(cache.amount)
      setTenure(cache.tenure)
      emiApi(cache.amount,cache.tenure)
    }
  }, [props.cache])

  const handleChangeAmount = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
    calculateInterest(event.target.value, "amount")
  };
  const changeSliderValue = (value) => {
    setAmount(value)
  }
  const handleChangeTenure = (event) => {
    setTenure(event.target.value === '' ? '' : Number(event.target.value));
    calculateInterest(event.target.value, "tenure")
    };

  const changeSliderTenure = (value) => {
    setTenure(value)
  }
/* function for calculating history
  Checks the queue length and if its less than 10,
  appends the data to the queue and if it is equal to 10,
  pop the data at index 0 by following the FIFO algorithm and then append the data.  
*/
  const computeHistory = () => {
    const data = JSON.parse(localStorage.getItem("history"));
    const inputs = { amount, tenure}
    if(data === null) {
      localStorage.history = JSON.stringify([inputs])
    } else if(data.length < 10) {    //maximum queue length assumed to be ten
      data.push(inputs)
      localStorage.history = JSON.stringify(data)
    } else {
      data.shift();
      data.push(inputs)
      localStorage.history = JSON.stringify(data)
    }
    props.history(JSON.parse(localStorage.getItem("history")))
  }
// emiApi function calls the api
  const emiApi = (emiAmount,emiTenure) => {
    api.emi.calculateInterest(emiAmount, emiTenure).then(res => {
      console.log(res)
      const { interestRate } = res
      const { amount } = res.monthlyPayment
      setMonthlyPayment({ amount: amount,interest: interestRate})
    })
  }
//function calculates the interset
  const calculateInterest = (value, context) => {
    switch(context) {
      case "amount": {
        if(value >= 500 && value <= 5000) {
          emiApi(value,tenure);
          computeHistory();  
        }
        break;
      }
      case "tenure": {
        if(value >= 6 && value <= 24) {
            emiApi(amount,value);
            computeHistory();
        }
          break;
      }
      default: break;
    }
  }
  useEffect(() => {
    if((amount >= 500 && amount <= 5000) && (tenure >= 6 && tenure <= 24)) {
      api.emi.calculateInterest(amount, tenure).then(res => {
        const { interestRate } = res
        const { amount } = res.monthlyPayment
        setMonthlyPayment({ amount: amount,interest: interestRate})
      })
    }
  }, [])
  return(
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={10}
      className={classes.input}
      >
        <Grid item>
          <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.input}>
          <TextField
            id="outlined-name"
            label="Loan Amount"
            value={amount}
            onChange={handleChangeAmount}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          </div>
          <Slider 
            data={{
              min: 500,
              max: 5000,
              step: 100,
              value: amount,
              changeSlider: changeSliderValue,
              calculateInterest: calculateInterest,
              context: "amount"
            }}
          />
          </form>
        </Grid>
        <Grid item>
          <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.input}>
          <TextField
            id="outlined-name"
            label="Loan Tenure"
            value={tenure}
            onChange={handleChangeTenure}
            variant="outlined"
          />
          </div>
          <Slider 
            data={{
                  min: 6,
                  max: 24,
                  step: 1,
                  value: tenure,
                  changeSlider: changeSliderTenure,
                  calculateInterest: calculateInterest,
                  context: "tenure"
                }}
            />
          </form>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={10}
      >
        <Grid item>
          <Calculator details={monthlyPayment} />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
        <Pie
          data={{
            labels:['Principal Loan Amount', 'Total Amount Payable' ],
            datasets:[{
              data:[amount, monthlyPayment.amount*tenure],
              backgroundColor:['#ff5722','#ffeb3b']
            }],
          }}
          height={250}
          options= {{
            legend: {
              position: 'bottom'
            }
          }}
        />
        </Grid>
      </Grid>
    </Grid>
  );
}
