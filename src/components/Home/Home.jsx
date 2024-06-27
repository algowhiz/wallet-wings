import React, { useState, useEffect } from 'react';
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import styles from './Home.module.css';
import { MdDelete, MdEdit } from "react-icons/md";
import ExpenseEditModal from '../ExpenseEditModal/ExpenseEditModal'
import { MdFileDownload } from "react-icons/md";

const Home = () => {
    const [expenses, setExpenses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        setExpenses(storedExpenses);
    }, []);

    const formatAmount = (amount) => {
        let formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        formattedAmount = formattedAmount.replace(/\B(?=(\d{4})+(?!\d))/g, ',');

        return formattedAmount;
    };

    const addExpense = (expense) => {
        const newExpenses = [...expenses, expense];
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
        setShowForm(false);
    };

    const deleteExpense = (index) => {
        setConfirmDeleteIndex(index);
    };

    const confirmDelete = () => {
        const newExpenses = expenses.filter((it, i) => i !== confirmDeleteIndex);
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
        setConfirmDeleteIndex(null);
    };

    const cancelDelete = () => {
        setConfirmDeleteIndex(null);
    };

    const editExpense = (index) => {
        setEditIndex(index);
    };

    const updateExpense = (updatedExpense) => {
        const updatedExpenses = [...expenses];
        updatedExpenses[editIndex] = updatedExpense;
        setExpenses(updatedExpenses);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        setEditIndex(null);
    };

    const cancelEdit = () => {
        setEditIndex(null);
    };

    const onCancel = () => setShowForm(false)

    const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);

    const downloadCSV = () => {
        let data = localStorage.getItem('expenses');
        let transactions = JSON.parse(data);
    
        function convertToCSV(objArray) {
            const array = objArray;
            let str = '';
            
            
            const headersOrder = ['date', 'amount', 'description', 'time'];
            
            
            str += headersOrder.join(',') + '\n';
            
            
            for (let i = 0; i < array.length; i++) {
                let line = '';
                for (let header of headersOrder) {
                    if (line !== '') line += ',';
                    line += array[i][header];
                }
                str += line + '\n';
            }
    
            return str;
        }
    
        let csvData = convertToCSV(transactions);
    
        function downloadCSV(csv, filename) {
            const csvFile = new Blob([csv], { type: 'text/csv' });
    
            const downloadLink = document.createElement('a');
            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = 'none';
    
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    
        downloadCSV(csvData, 'transactions.csv');
    }
    

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Home Finance App</h1>
            </header>
            {expenses?.length > 0 &&
                <div className={styles.downloadCSV} >
                    <button
                        type="button"
                        onClick={downloadCSV}
                        className={styles.csv}
                    >
                         <p> CSV</p><p><MdFileDownload size={30} /></p>
                    </button>
                </div>}
            <div className={showForm ? styles.buttonContainer : styles.buttonContainer2}>
                {showForm && <button
                    type="button"
                    onClick={onCancel}
                    className={styles.button}
                >
                    Back
                </button>}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={styles.button}
                >
                    Add Expenses
                </button>
            </div>

            {showForm ? (
                <ExpenseForm addExpense={addExpense} onCancel={() => setShowForm(false)} />
            ) : (
                <><div className={styles.expenseContainer}>
                    {expenses.length > 0 ? (
                        expenses.map((expense, index) => (
                            <div key={index} className={styles.expenseItem}>
                                <div className={styles.flexContainer}>
                                    <p className={styles.expenseDescription}> {expense.description}</p>
                                    <p className={styles.expenseAmount}>Amount: ₹ {formatAmount(expense.amount)}</p>
                                </div>
                                <div className={styles.expenseDate}>
                                    <span>{expense.date}  ,  {expense.time}</span>
                                    <div className={styles.actions}>
                                        <button onClick={() => editExpense(index)} className={styles.editButton}>
                                            <MdEdit />
                                        </button>
                                        <button onClick={() => deleteExpense(index)} className={styles.deleteButton}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <p className={styles.noExpenses}>No Transactions to show</p>
                    )}
                </div>
                    {totalExpense !== 0 && <div className={styles.totalExpense}>
                        <p>Total Expense: ₹ {formatAmount(totalExpense)}</p>
                    </div>}
                </>
            )}

            {confirmDeleteIndex !== null && (
                <div className={styles.overlay}>
                    <div className={styles.confirmDelete}>
                        <div>
                            <p>Are you sure you want to delete this transaction?</p>
                        </div>
                        <div className={styles.confirmation}>
                            <button className={styles.no} onClick={cancelDelete}>No</button>
                            <button className={styles.yes} onClick={confirmDelete}>Yes</button>
                        </div>
                    </div>
                </div>

            )}

            {editIndex !== null && (
                <ExpenseEditModal
                    expense={expenses[editIndex]}
                    updateExpense={updateExpense}
                    cancelEdit={cancelEdit}
                />
            )}
        </div>
    );
};




export default Home;
