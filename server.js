const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config({ path: 'config.env' })
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');


// DB , app
dbConnection();
const app = express()


// Middlewares
app.use(express.json())
if (process.env.NODE_ENV === 'development') { app.use(morgan('dev')) }

// routes
app.use('/api/v1/categories', categoryRoute);
app.all('*', (req, res, next) => {
    // catch error and send to error handeling middleware
    //const err = new Error(`Page not found : ${req.originalUrl}`);
    //next(err.message);
    // or use ApiError class
    next(new ApiError(`Page not found : ${req.originalUrl}`, 400))
})
// Global error handeling middleware provided by express
app.use(globalError)




const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


