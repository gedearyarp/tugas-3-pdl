const express = require('express');
const app = express();
const port = 3000;

const dotenv = require('dotenv');
dotenv.config();

const testController = require('./controllers/test.controller');

app.use(express.json());

app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK');
});

app.use('/test', testController);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
