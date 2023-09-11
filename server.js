const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config({ path: 'config.env' })
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');


// DB Connection, app
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
    next(new ApiError(`Page not found : ${req.originalUrl}`, 400))
})

// Global error handeling middleware for express
app.use(globalError)

const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`App is listening on port ${port}!`))


// Handle Rejections from promises outside express
process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection Error : ${err} | ${err.message}`);
    server.close(() => {
        console.error('Shutting down.....');
        process.exit(1);
    })
});

