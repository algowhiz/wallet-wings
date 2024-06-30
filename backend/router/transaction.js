const express = require('express');
const router = express.Router();
const Transaction = require('../model/transaction');
const { getAllTransaction, addTransaction, UpdateTransaction, delTrasaction } = require('../controller/transaction')

router.get('/:userId', getAllTransaction);
router.post('/', addTransaction);
router.patch('/:id', UpdateTransaction);
router.delete('/:id', delTrasaction);
router.post('/bulk', async (req, res) => {
  try {
    const transactions = req.body.transactions; // Assuming req.body.transactions is an array of objects
    const userId = req.body.userId; // Assuming you're also sending userId
  
    // Find the user by userId
    let user = await Transaction.findOne({ userId });
  
    if (!user) {
      // If user doesn't exist, create a new user with empty transactions array
      user = new Transaction({ userId, transactions: [] });
    }
  
    // Map and add each transaction to the user's transactions array
    transactions.forEach(transaction => {
      user.transactions.push({
        ...transaction,
        userId: userId // Assigning userId to each transaction
      });
    });
  
    // Save the user document with the updated transactions
    await user.save();
  
    res.status(201).json(user.transactions); // Respond with updated transactions array
  } catch (error) {
    console.error('Error adding transactions:', error);
    res.status(500).json({ error: 'Failed to add transactions' });
  }
});


module.exports = router;
