const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');
app.use(express.json());
app.use(cors());

//Routes
const postRouter = require('./routes/Post');
app.use('/posts', postRouter);
const commentsRouter = require('./routes/Comment');
app.use('/comments', commentsRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Hello your server is running on port 3001');
    });
});
