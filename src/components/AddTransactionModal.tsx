"use client";
import { FC, useState } from 'react';
import Modal from '@/components/Modal';

const categories = [
  'Income',
  'Groceries',
  'Rent',
  'Utilities',
  'Entertainment',
  'Transportation',
  'Healthcare',
  'Dining',
  'Shopping',
  'Travel',
  'Miscellaneous',
];

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddTransaction: (amount: string, category: string, type: "expense" | "income", description: string) => void;
  error: string | null;
}

const AddTransactionModal: FC<AddTransactionModalProps> = ({ isOpen, onClose, handleAddTransaction, error }) => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>(categories[0]);
  const [type, setType] = useState<"expense" | "income">('expense');
  const [description, setDescription] = useState<string>('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddTransaction(amount, category, type, description);
    setAmount('');
    setCategory(categories[0]);
    setType('expense');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold text-white mb-4">Add Transaction</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-gray-300"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-300">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "expense" | "income")}
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-gray-300"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 text-gray-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Transaction
        </button>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
