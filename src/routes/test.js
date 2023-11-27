const express = require('express');
const router = express.Router();

router.get('/read-1', (req, res) => {
    res.status(200).send('OK');
});

router.get('/read-2', (req, res) => {
    res.status(200).send('OK');
});

router.get('/read-3', (req, res) => {
    res.status(200).send('OK');
});

router.post('/insert', (req, res) => {
    res.status(200).send('OK');
});

router.put('/update', (req, res) => {
    res.status(200).send('OK');
});

router.delete('/delete', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
