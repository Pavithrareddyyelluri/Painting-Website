
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
const path = require('path');
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'static')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => {
    console.log(`Server is started on http://localhost:3000`);
});