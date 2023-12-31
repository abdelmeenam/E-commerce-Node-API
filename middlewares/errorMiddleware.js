const sendErrorDev = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
})

const sendErrorProd = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    message: err.message
})


const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    if (process.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    }
}



module.exports = globalError;