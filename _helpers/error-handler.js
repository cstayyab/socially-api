module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (process.env.NODE_ENV !== 'production') {
        console.trace(err);
    }
    let errJson = {success: false, message: typeof (err) === 'string' ? err : err.message};
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json(errJson);
    }

    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(400).json(errJson);
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        errJson.message = 'Invalid Token';
        return res.status(401).json(errJson);
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}