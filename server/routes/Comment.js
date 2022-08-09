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
    const comment = req.body;
    const username = req.user.username;
    comment.username = username; // Object của comment thêm 1 key là username và có giá trị là username (req.user.username)
    const a = await Comments.create(comment);
    res.json(a);
});

// Xoá comment
router.delete('/:commentId', validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    await Comments.destroy({
        where: {
            id: commentId,
        },
    });
    res.json('Đã xóa thành công');
});

module.exports = router;
