const httpErrors = require('http-errors');

exports.postSupply = async (req, res, next) => {
    try {

        res.status(200).json({ message: "OK" });

    }

    catch (err) {
        next(err);
    }
}

