import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data } = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {transactions.map((transaction) => (
        <div key={transaction._id} style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>{transaction.name}</h3>
          <p>Amount: ${transaction.amount}</p>
          <p>Transaction ID: {transaction.transactionId}</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
