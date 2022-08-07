const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
router.post('/', (req, res) => {
    const { username, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            // Store hash in your password DB.
            Users.create({
                username: username,
                password: hash,
            });
            res.json('SUCCESS');
        });
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({
        Where: { username: username },
    });
    if (!user) res.json({ error: 'User does not exist' });
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.json({ error: 'Wrong username and  password' });
        }
        const accessToken = sign(
            {
                username: user.username,
                id: user.id,
            },
            'chien'
        );
        res.json(accessToken);
    });
});
module.exports = router;
