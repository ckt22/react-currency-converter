const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// using json responses.
app.use(express.json());

// app.use(express.static('../build'));

// const uri = process.env.ATLAS_URI;
// Deadling with updates to MongoDB.
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } );
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("MongoDb database connection established successfully.");
// })

// const exercisesRouter = require('./routes/exercises');
// const usersRouter = require('./routes/users');

// app.use('/exercises', exercisesRouter);
// app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})