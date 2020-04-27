import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/header'
import CurrencyRow from './component/currencyRow'
import DateRow from './component/dateRow'
import axios from 'axios'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [date, setDate] = useState(new Date());
  const [rates, setRates] = useState([]);

  const prependTextDate = "Choose Date";
  const toCurrencyDescription = "to";
  const fromCurrencyDescription = "from";

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  if (exchangeRate != null) {
    if (fromAmount < 1) {
      fromAmount = 1;
      toAmount = 1 * exchangeRate;     
    }
  }

// fetching conversion rates from the backend.
  useEffect(() => {
    axios.get('http://localhost:5000/init')
    .then(response => {
      const data = response.data;
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
      setRates([1, ...Object.values(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
    })
  }, [])

  // updates the exchange rate when the user selects a new currency option.
  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      setExchangeRate(rates[currencyOptions.indexOf(toCurrency)]/rates[currencyOptions.indexOf(fromCurrency)]);
      setAmountInFromCurrency(true);
    }
  }, [fromCurrency])

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      setExchangeRate(rates[currencyOptions.indexOf(toCurrency)]/rates[currencyOptions.indexOf(fromCurrency)]);
      setAmountInFromCurrency(false);
    }
  }, [toCurrency])
  
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  // Use axios to get the historical rate.
  function handleDateChange(e) {
    setDate(e);
    const date = moment(e, 'YYYY-MM-DD').format();
    const dateStr = date.substr(0,10);
    const today = moment(new Date(), 'YYYY-MM-DD').format();
    if ( dateStr !== today.substr(0,10) ) {
      axios.get('http://localhost:5000/historical/'+ dateStr)
      .then(response => {
        const data = response.data;
        setRates([1, ...Object.values(data.rates)]);
        setExchangeRate(rates[currencyOptions.indexOf(toCurrency)]/rates[currencyOptions.indexOf(fromCurrency)]);
      })
    } else {
      axios.get('http://localhost:5000/init')
      .then(response => {
        const data = response.data;
        const firstCurrency = Object.keys(data.rates)[0];
        setRates([1, ...Object.values(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
    }
  }

  return (
      <Container fluid={true}>
      <Header />
        <div>
        <Row float="center">
          <Col md={{span: 10, offset: 1}}>
          <CurrencyRow
            currencyDescription={fromCurrencyDescription}
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
            />
          </Col>
        </Row>
        <Row float="center">
          <Col md={{span: 10, offset: 1}}>
            <CurrencyRow
            currencyDescription={toCurrencyDescription}
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
            /> 
            </Col>
        </Row>
        <Row float="center">
          <Col md={{span: 8, offset: 4}}>
            <DateRow
            prependText={prependTextDate}
            date={date}
            onChangeDate={handleDateChange}
            />
          </Col>
        </Row> 
        </div>  
      </Container>
  );
}

export default App;
