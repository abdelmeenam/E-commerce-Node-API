const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config({ path: 'config.env' })
const dbConnection = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');

// DB  , app
dbConnection();
const app = express()


// Middlewares
app.use(express.json())
if (process.env.NODE_ENV === 'development') { app.use(morgan('dev')) }

// routes
app.use('/api/v1/categories', categoryRoute);



const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


