import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_URL = '/api/transactions';

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data.transactions || []);
      setBalance(data.balance || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (transaction) => {
    try {
      setError(null);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to create transaction');
      }
      const data = await res.json();
      setBalance(data.balance || 0);
      await fetchTransactions();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setError(null);
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete transaction');
      const data = await res.json();
      setBalance(data.balance || 0);
      await fetchTransactions();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Compute totals by category for chart
  const expensesByCategory = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balance,
        loading,
        error,
        totalIncome,
        totalExpense,
        expensesByCategory,
        addTransaction,
        deleteTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
