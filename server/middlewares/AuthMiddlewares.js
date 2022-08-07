const { verify } = require('jsonwebtoken');
const validateToken = (req, res, next) => {
    const accessToken = req.header('accessToken');
    if (!accessToken)
        return res.json({
            error: 'user not logged in',
        });
    try {
        const validToken = verify(accessToken, 'chien');
        if (validToken) {
            return next();
        }
    } catch (error) {
        return res.json({ error: error });
    }
};

module.exports = { validateToken };
