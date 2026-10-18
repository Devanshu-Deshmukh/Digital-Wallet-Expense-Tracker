import { useState } from 'react';
import { TransactionProvider, useTransactions } from './context/TransactionContext';
import Header from './components/Header';
import BalanceCards from './components/BalanceCards';
import ExpenseChart from './components/ExpenseChart';
import RecentTransactions from './components/RecentTransactions';
import TransactionModal from './components/TransactionModal';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const { error } = useTransactions();

  return (
    <div className="min-h-screen bg-cream-100">
      <Header onAddClick={() => setShowModal(true)} />

      <main className="w-full px-6 sm:px-10 lg:px-14 py-6 space-y-6">
        {/* Error Banner */}
        {error && (
          <div className="bg-expense-light border border-expense/20 rounded-xl px-4 py-3 text-expense text-sm flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {/* Balance Summary Cards */}
        <BalanceCards />

        {/* Chart + Transactions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <ExpenseChart />
          </div>
          <div className="lg:col-span-3">
            <RecentTransactions />
          </div>
        </div>
      </main>

      {/* Transaction Modal */}
      {showModal && <TransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <Dashboard />
    </TransactionProvider>
  );
}
