const { verify } = require('jsonwebtoken');
// Có chứ năng là từ Token chuối băm chuyển thành về dạng objcet chứa các thông tin
const validateToken = (req, res, next) => {
    // console.log('++++++', req.header());
    const accessToken = req.header('accessToken');
    if (!accessToken)
        return res.json({
            error: 'user not logged in',
        });
    try {
        const validToken = verify(accessToken, 'chien'); // Qúa trình từ Token hàm băm chuyển về dạng số ban đầu
        // const username = validToken.username;
        console.log('************', validToken);
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (error) {
        return res.json({ error: error });
    }
};

module.exports = { validateToken };
