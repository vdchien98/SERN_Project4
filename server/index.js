const express = require('express');
const app = express();
// const mysql = require('mysql');
// const cors = require('cors');

const db = require('./models');
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Hello your server is running on port 3001');
    });
});
