const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const User = require('../models/user.Model')

const authenToken = (req, res, next) => {
    const authorizationClient = req.headers['authorization'];
    const token = authorizationClient && authorizationClient.split(' ')[1];
    if (! token) return res.sendStatus(401);
    
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).end();
            } else {
                res.locals.jwt = decoded;
                const user = await User.findOne({ where: {email: decoded.email }});
                if (! user) {
                    return res.status(404).send({ message: 'User not found' });
                }
                req.user = user;
                next();
            }
        });
    } catch (error) {
        return res.sendStatus(403);
    }
}

module.exports = {
    authenToken: authenToken,
}