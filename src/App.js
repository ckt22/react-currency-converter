import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './component/header'
import CurrencyRow from './component/currencyRow'
import DateRow from './component/dateRow'
import axios from 'axios'

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [date, setDate] = useState(new Date());

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

//setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
// fetching conversion rates from the backend.
// axios.get('http://localhost:5000/')
// .then(response => response.json())
// .then(data => {
//   const firstCurrency = Object.keys(data.rates)[0];
//   setCurrencyOptions(['123', '456', '789']);
//   setFromCurrency(data.base);
//   setToCurrency(firstCurrency);
//   setExchangeRate(data.rates[firstCurrency])
// })
  useEffect(() => {
      const firstCurrency = '123';
      setCurrencyOptions(['123', '456', '789']);
      setFromCurrency('123');
      setToCurrency('456');
      setExchangeRate(0.3);
  }, [])

  // updates the exchange rate when the user selects a new currency option.
  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
      if (fromCurrency !== toCurrency) {
        axios.get('http://localhost:5000/')
        .then(response => response.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
      } else {
        let tempCurrency = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(tempCurrency);
      }
    }
  }, [fromCurrency, toCurrency])
  
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  // TODO: use axios to get the history rate.
  function handleDateChange(e) {
    setDate(e);
  }

  return (
    <div className="App">
      <div className="container">
        <Header />
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
        <DateRow 
          date={date}
          onChangeDate={handleDateChange}
        />
      </div>
    </div>
  );
}

export default App;
