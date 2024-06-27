import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';

const ExpenseForm = ({ addExpense, onCancel }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenditure = {
            amount,
            description,
            date: new Date().toLocaleDateString(), // Store the current date
            time: new Date().toLocaleTimeString()
        };
        addExpense(expenditure);
        setAmount('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2 className={styles.formTitle}>Add Expenditure</h2>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="amount">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="description">
                    Description
                </label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>
            <div className={styles.buttonContainer}>
                <button
                    type="submit"
                    className={`${styles.button} ${styles.buttonGreen}`}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
