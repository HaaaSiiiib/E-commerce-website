const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

    const authHeader = req.get('Authorization');
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token);
    if (token == null) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, 'mysecretkey');
        console.log(decoded);
        req.isLoggedIn = true;
        req.user = await User.query().findById(decoded.id);
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(401).send(err);
    }
}