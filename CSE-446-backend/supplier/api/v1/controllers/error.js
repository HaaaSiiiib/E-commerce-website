exports.errorHandler = (err, req, res, next) => {

    if (!err.statusCode) {
        err.statusCode = 500;
    }
    res.status(err.statusCode).json({
        message: err.message,
        //type: "UnknownError",
        data: err
    });

};
