const Transaction = require('../model/transaction');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const getAllTransaction = async (req, res) => {
    const { userId } = req.params;
    const { skip = 0, limit = 10 } = req.query; 

    try {
        const userTransactions = await Transaction.findOne({ userId }).select('transactions');

        if (!userTransactions) {
            return res.status(404).json({ error: 'Transactions not found' });
        }

        // Apply pagination
        const transactions = userTransactions.transactions.slice(Number(skip), Number(skip) + Number(limit));

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const addTransaction = async (req, res) => {
    try {
        const { userId, expense } = req.body;

        let user = await Transaction.findOne({ userId });

        if (!user) {
            user = new Transaction({ userId, transactions: [] });
        }

        user.transactions.push({
            description: expense?.description,
            amount: expense?.amount,
            date: expense?.date // Assuming date is already formatted properly
        });

        await user.save();

        res.status(201).json(user.transactions[user.transactions.length - 1]);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const UpdateTransaction = async (req, res) => {
    const { id } = req.params;
    const { description, amount, date } = req.body; // Destructure fields from req.body

    try {
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { 'transactions._id': id }, // Find transaction within transactions array by its _id
            {
                $set: {
                    'transactions.$.description': description,
                    'transactions.$.amount': amount,
                    'transactions.$.date': date
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json(updatedTransaction); // Return the updated transaction as JSON
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const delTrasaction = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Transaction.findOneAndUpdate(
            { 'transactions._id': id },
            { $pull: { transactions: { _id: id } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

const addTransactions = async (req, res) => {
    try {
      const transactions = req.body.transactions;
      const userId = req.body.userId; 
    
      let user = await Transaction.findOne({ userId });
    
      if (!user) {
        user = new Transaction({ userId, transactions: [] });
      }
  
      transactions.forEach(transaction => {
        user.transactions.push({
          ...transaction,
          userId: userId 
        });
      });
  
      await user.save();
      
      res.status(201).json(user.transactions);
    } catch (error) {
      console.error('Error adding transactions:', error);
      res.status(500).json({ error: 'Failed to add transactions' });
    }
  }


module.exports = { getAllTransaction, addTransaction, UpdateTransaction, delTrasaction , addTransactions };
