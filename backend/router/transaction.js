const express = require('express');
const router = express.Router();
const Transaction = require('../model/transaction');
const { getAllTransaction, addTransaction, UpdateTransaction, delTrasaction , addTransactions} = require('../controller/transaction')

router.get('/:userId', getAllTransaction);
router.post('/', addTransaction);
router.patch('/:id', UpdateTransaction);
router.delete('/:id', delTrasaction);
router.post('/bulk',addTransactions);


module.exports = router;
