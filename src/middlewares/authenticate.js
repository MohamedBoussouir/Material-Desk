const jwt_util = require('../utils/jwt.util');

const authenticate = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Access token missing or malformed' });
        }

        const token = authHeader.split(' ')[1];

        const decodedPayload = jwt_util.verifyToken(token);

        if (!decodedPayload) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        req.user = decodedPayload;


        next();

    } catch (error) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
};

module.exports = authenticate ;