import axios from 'axios';

export default {
    emi: {
        calculateInterest: (amount, tenure) => 
            axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${tenure}`)
                .then(res => res.data)
    }
}