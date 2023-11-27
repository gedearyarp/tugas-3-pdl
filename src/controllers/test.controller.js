const express = require('express');
const router = express.Router();
const { read1, read2, read3 } = require('../services/test.service');

router.get('/read-1', async (req, res) => {
    const val = await read1();
    res.status(200).send(val);
});

router.get('/read-2', async (req, res) => {
    const val = await read2();
    res.status(200).send(val);
});

router.get('/read-3', async (req, res) => {
    const val = await read3();
    res.status(200).send(val);
});

router.post('/insert', async (req, res) => {
    res.status(200).send('OK');
});

router.put('/update', async (req, res) => {
    res.status(200).send('OK');
});

router.delete('/delete', async (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
