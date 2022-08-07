const express = require('express');
const router = express.Router();
const { Posts } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddlewares');
router.get('/', async (req, res) => {
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id); // findByPk(id) Tìm duy nhất đối tượng chứa Id và lấy hết thông tin
    res.json(post);
});

router.post('/', validateToken, async (req, res) => {
    // tạo dữ liệu trong bảng
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});

module.exports = router;
