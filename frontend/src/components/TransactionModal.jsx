import { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const EXPENSE_CATEGORIES = ['Food', 'Rent', 'Entertainment', 'Transport', 'Shopping', 'Utilities', 'Health', 'Education', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Other'];

export default function TransactionModal({ onClose }) {
  const { addTransaction } = useTransactions();

  const [form, setForm] = useState({
    amount: '',
    type: 'EXPENSE',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categories = form.type === 'INCOME' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleTypeChange = (type) => {
    const defaultCat = type === 'INCOME' ? 'Salary' : 'Food';
    setForm((prev) => ({ ...prev, type, category: defaultCat }));
  };

  const validate = () => {
    const errs = {};
    if (!form.amount || parseFloat(form.amount) <= 0) errs.amount = 'Amount must be greater than zero';
    if (!form.category) errs.category = 'Category is required';
    if (!form.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
      description: form.description,
    };

    const result = await addTransaction(payload);
    setSubmitting(false);
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content bg-cream-50 rounded-lg shadow-xl w-full max-w-lg mx-4 border border-brown-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-brown-100">
          <h2 className="text-xl font-bold text-brown-700">New Transaction</h2>
          <button
            id="btn-close-modal"
            onClick={onClose}
            className="p-2 rounded-md hover:bg-cream-200 text-brown-400 hover:text-brown-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-6">
          {/* Type Toggle */}
          <div>
            <label className="block text-sm font-semibold text-brown-600 mb-2.5">Type</label>
            <div className="flex rounded-md overflow-hidden border border-brown-200">
              <button
                type="button"
                onClick={() => handleTypeChange('EXPENSE')}
                className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                  form.type === 'EXPENSE'
                    ? 'bg-expense text-white'
                    : 'bg-cream-100 text-brown-400 hover:bg-cream-200'
                }`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('INCOME')}
                className={`flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                  form.type === 'INCOME'
                    ? 'bg-income text-white'
                    : 'bg-cream-100 text-brown-400 hover:bg-cream-200'
                }`}
              >
                Income
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-brown-600 mb-2">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={`w-full px-4 py-3 rounded-md border text-brown-700 bg-cream-100 placeholder-brown-300
                         focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition text-base
                         ${errors.amount ? 'border-expense' : 'border-brown-200'}`}
            />
            {errors.amount && <p className="text-xs text-expense mt-1.5">{errors.amount}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-brown-600 mb-2">Category</label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-brown-200 text-brown-700 bg-cream-100
                         focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition appearance-none cursor-pointer text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-brown-600 mb-2">Date</label>
            <input
              id="date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={`w-full px-4 py-3 rounded-md border text-brown-700 bg-cream-100
                         focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition text-base
                         ${errors.date ? 'border-expense' : 'border-brown-200'}`}
            />
            {errors.date && <p className="text-xs text-expense mt-1.5">{errors.date}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-brown-600 mb-2">Description (optional)</label>
            <input
              id="description"
              type="text"
              placeholder="E.g., Lunch at restaurant"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-md border border-brown-200 text-brown-700 bg-cream-100
                         placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition text-base"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              id="btn-submit-transaction"
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-md font-semibold text-base text-cream-50 bg-royal-500
                         hover:bg-royal-600 active:bg-royal-700 transition-colors shadow-md
                         disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-cream-50 border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                `Add ${form.type === 'INCOME' ? 'Income' : 'Expense'}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
