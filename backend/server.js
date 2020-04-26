const express = require('express');
const cors = require('cors');
var app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// using json responses.
// app.use(express.json());

// app.use(express.static('../build'));

const fetch = require('node-fetch');
const base_url = 'https://openexchangerates.org/api/';
const app_id_query = '?app_id=dc535d953853456ba5e31c20f2600398';
const latest_query = 'latest.json';
const init_url = base_url + latest_query + app_id_query;
const historical_query = 'historical/';

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// By default, we get the latest currency exchange rates.
app.get('/init', async (req,res) => {
    let result = await fetch(base_url + latest_query + app_id_query);
    let json = await result.json();
    return res.json(json);
});

// Handling historical rate enquiry.
app.get('/historical/:dateStr', async (req,res) => {
    const dateStr = req.params.dateStr;
    let result = await fetch(base_url + historical_query + dateStr + '.json' + app_id_query);
    let json = await result.json();
    return res.json(json);
});

// TODO: support base changes.
app.get('/:base', async (req,res) => {
    let result = await fetch(base_url + latest_query + app_id_query);
    let json = await result.json();
    return res.json(json);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})