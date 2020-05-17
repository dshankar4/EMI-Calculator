import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { PieChart } from 'react-minimal-pie-chart';
import Divider from "@material-ui/core/Divider";
import styleActions from '../styles/actionarea';
import Calculator from './calculator';
import Slider from './slider';
import api from '../api';

const useStyles = makeStyles(styleActions);
export default function ActionArea(props){
    const classes = useStyles();
    const [amount, setAmount] = React.useState(500);
    const [tenure, setTenure] = React.useState(6);
    const [monthlyPayment, setMonthlyPayment] = React.useState({
        amount: 0, interest: 0
    })
    console.log(props)

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

    const computeHistory = () => {
      const data = JSON.parse(localStorage.getItem("history"));
      const inputs = { amount, tenure}
      if(data === null) {
        localStorage.history = JSON.stringify([inputs])
      } else if(data.length < 10) {
        data.push(inputs)
        localStorage.history = JSON.stringify(data)
      } else {
        data.shift();
        data.push(inputs)
        localStorage.history = JSON.stringify(data)
      }
      props.history(JSON.parse(localStorage.getItem("history")))
    }

    const emiApi = (emiAmount,emiTenure) => {
      api.emi.calculateInterest(emiAmount, emiTenure).then(res => {
        console.log(res)
        const { interestRate } = res
        const { amount } = res.monthlyPayment
        setMonthlyPayment({ amount: amount,interest: interestRate})

      })
    }

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
        default: {
 //         emiApi(amount,tenure);
          break;
        }
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
        <PieChart
            data={[
              { title: (amount/(amount+monthlyPayment.amount*tenure)*(100)), value: amount, color: '#E38627' },
              { title: (monthlyPayment.amount*tenure/(amount+monthlyPayment.amount*tenure)*(100)), value: monthlyPayment.amount*tenure, color: '#C13C37' },
            ]}
          />
        </Grid>
    </Grid>
    </Grid>
  );
}



