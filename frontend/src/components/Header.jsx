export default function Header({ onAddClick }) {
  return (
    <header className="bg-cream-50 border-b border-brown-100 shadow-sm">
      <div className="w-full px-6 sm:px-10 lg:px-14 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-royal-500 flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-cream-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-brown-800 tracking-tight">Digital Wallet</h1>
            <p className="text-xs text-brown-400">Expense Tracker</p>
          </div>
        </div>

        {/* Add Transaction Button */}
        <button
          id="btn-add-transaction"
          onClick={onAddClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-royal-500 text-cream-50 font-semibold text-sm
                     hover:bg-royal-600 active:bg-royal-700 transition-colors shadow-md cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Transaction
        </button>
      </div>
    </header>
  );
}
