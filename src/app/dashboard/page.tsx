'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTransactions, addTransaction, getAccount, updateAccountBalance } from '@/firebase/api';
import Modal from '@/components/Modal';
import withAuth from '@/components/withAuth';

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [amountSpent, setAmountSpent] = useState<number>(0);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAccountDetails();
      fetchTransactions();
    }
  }, [user]);

  const fetchAccountDetails = async () => {
    if (user) {
      const account = await getAccount(user.uid);
      setBalance(account?.balance);
    }
  };

  const fetchTransactions = async () => {
    if (user) {
      const userTransactions = await getTransactions(user.uid);
      setTransactions(userTransactions);
      calculateAmountSpent(userTransactions);
    }
  };

  const calculateAmountSpent = (transactions: any[]) => {
    const totalSpent = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setAmountSpent(totalSpent);
  };

  const handleAddTransaction = async (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      const currentAccount = await getAccount(user.uid);
      let newBalance = currentAccount?.balance;
      const transactionAmount = parseFloat(amount);
      if (type === 'expense') {
        newBalance -= transactionAmount;
      } else if (type === 'income') {
        newBalance += transactionAmount;
      }

      await updateAccountBalance(user.uid, newBalance);
      await addTransaction(user.uid, user.uid, transactionAmount, category, type, new Date(), description || '');
      fetchTransactions();
      setBalance(newBalance);
      setIsModalOpen(false);
      resetFormFields();
    }
  };

  const resetFormFields = () => {
    setAmount('');
    setCategory('');
    setType('expense');
    setDescription('');
  };

  const openModal = () => {
    resetFormFields();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-400">Balance</h2>
            <p className="text-3xl font-bold text-white mt-2">${balance.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-400">Amount Spent</h2>
            <p className="text-3xl font-bold text-white mt-2">${amountSpent.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Transaction
          </button>
        </div>
        
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
          <form onSubmit={handleAddTransaction}>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Transactions</h2>
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
                <div>
                  <p className="text-white font-medium">{transaction.category}</p>
                  <p className="text-gray-400">{transaction.description}</p>
                </div>
                <div className={`text-white font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);