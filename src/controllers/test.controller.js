const express = require('express');
const router = express.Router();
const { read1, read2, read3, insertMahasiswa, updateMahasiswa, deleteMahasiswa } = require('../services/test.service');

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
    const val = await insertMahasiswa(req.body);
    res.status(200).send(val);
});

router.patch('/update', async (req, res) => {
    const val = await updateMahasiswa(req.body);
    res.status(200).send(val);
});

router.delete('/delete', async (req, res) => {
    const val = await deleteMahasiswa(req.body);
    res.status(200).send(val);
});

module.exports = router;
