import React, { useState } from 'react';
import styles from './ExpenseEditModal.module.css';

const ExpenseEditModal = ({ expense, updateExpense, cancelEdit }) => {
    const [editedExpense, setEditedExpense] = useState({ ...expense });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense({ ...editedExpense, [name]: value });
    };

     const handleSubmit = () => {
        // Update date and time before submitting
        const updatedExpense = {
            ...editedExpense,
            date: new Date().toLocaleString()
        };
        updateExpense(updatedExpense);
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h2>Edit Expense</h2>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={editedExpense.description}
                    onChange={handleInputChange}
                />
                <label>Amount</label>
                <input
                    type="text"
                    name="amount"
                    value={editedExpense.amount}
                    onChange={handleInputChange}
                />
                <div className={styles.modalButtons}>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </div>
            </div>
        </div>
    );
};


export default ExpenseEditModal;