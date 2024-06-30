const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactions: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: String ,default: () => new Date().toLocaleString()}
    }
  ]
});

module.exports = mongoose.model('Transaction', TransactionSchema);
