import { useTransactions } from '../context/TransactionContext';

export default function RecentTransactions() {
  const { transactions, deleteTransaction, loading } = useTransactions();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Food: '🍔',
      Rent: '🏠',
      Entertainment: '🎬',
      Transport: '🚗',
      Shopping: '🛍️',
      Utilities: '💡',
      Health: '🏥',
      Education: '📚',
      Salary: '💰',
      Freelance: '💻',
      Investment: '📈',
      Other: '📌',
    };
    return icons[category] || '📌';
  };

  if (loading) {
    return (
      <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm h-full">
        <h2 className="text-lg font-bold text-brown-700 mb-4">Recent Transactions</h2>
        <div className="flex items-center justify-center py-12 text-brown-300">
          <div className="w-6 h-6 border-2 border-royal-500 border-t-transparent rounded-full animate-spin mr-3"></div>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 rounded-lg p-6 border border-brown-100 shadow-sm h-full animate-fade-in-up">
      <h2 className="text-lg font-bold text-brown-700 mb-4">Recent Transactions</h2>

      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-brown-300">
          <svg className="w-14 h-14 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m3 0H9.75m0 0v3.375m0-3.375h3m-3 0H6.375a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h4.5" />
          </svg>
          <p className="text-sm">No transactions yet</p>
          <p className="text-xs mt-1">Add your first transaction to get started</p>
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 p-3.5 rounded-md bg-cream-100 hover:bg-cream-200 transition-colors group"
            >
              {/* Category Icon */}
              <div className="w-10 h-10 rounded-md bg-cream-50 border border-brown-100 flex items-center justify-center text-lg shrink-0">
                {getCategoryIcon(t.category)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-brown-700 truncate">{t.category}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    t.type === 'INCOME'
                      ? 'bg-income-light text-income'
                      : 'bg-expense-light text-expense'
                  }`}>
                    {t.type}
                  </span>
                </div>
                <p className="text-xs text-brown-400 truncate mt-0.5">
                  {t.description || 'No description'} · {formatDate(t.date)}
                </p>
              </div>

              {/* Amount */}
              <p className={`font-bold text-sm shrink-0 ${
                t.type === 'INCOME' ? 'text-income' : 'text-expense'
              }`}>
                {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(t.amount)}
              </p>

              {/* Delete Button */}
              <button
                id={`btn-delete-${t.id}`}
                onClick={() => deleteTransaction(t.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md
                           hover:bg-expense-light text-brown-300 hover:text-expense cursor-pointer"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
