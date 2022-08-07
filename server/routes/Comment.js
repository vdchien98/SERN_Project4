const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddlewares');
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({
        where: {
            PostId: postId,
        },
    });
    res.json(comments);
});

router.post('/', validateToken, async (req, res) => {
    // tạo dữ liệu trong bảng
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
});
module.exports = router;
