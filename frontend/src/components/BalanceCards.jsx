import { useTransactions } from '../context/TransactionContext';

export default function BalanceCards() {
  const { balance, totalIncome, totalExpense } = useTransactions();

  const formatCurrency = (amount) => {
    const abs = Math.abs(amount);
    if (abs >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (abs >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Total Balance */}
      <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-royal-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-royal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-brown-400 tracking-wide uppercase">Total Balance</p>
        </div>
        <p className={`text-3xl font-extrabold tracking-tight ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
          {formatCurrency(balance)}
        </p>
      </div>

      {/* Total Income */}
      <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-income-light flex items-center justify-center">
            <svg className="w-5 h-5 text-income" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
            </svg>
          </div>
          <p className="text-sm font-medium text-brown-400 tracking-wide uppercase">Total Income</p>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-income">{formatCurrency(totalIncome)}</p>
      </div>

      {/* Total Expenses */}
      <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-md bg-expense-light flex items-center justify-center">
            <svg className="w-5 h-5 text-expense" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>
          </div>
          <p className="text-sm font-medium text-brown-400 tracking-wide uppercase">Total Expenses</p>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-expense">{formatCurrency(totalExpense)}</p>
      </div>
    </div>
  );
}
