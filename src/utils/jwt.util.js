const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_here';



function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
}


function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
}