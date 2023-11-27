const express = require('express');
const app = express();
const port = 3000;

const testRoute = require('./routes/test');

app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK');
});

app.use('/test', testRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
