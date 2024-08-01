'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  getTransactions,
  addTransaction,
  getAccount,
  updateAccountBalance,
  addBudgetToFirestore,
  getBudget,
} from '@/firebase/api';
import withAuth from '@/components/withAuth';
import AccountSummary from '@/components/AccountSummary';
import TransactionList from '@/components/TransactionList';
import AddTransactionModal from '@/components/AddTransactionModal';
import SpendingCategoryChart from '@/components/SpendingCategoryChart';
import * as XLSX from 'xlsx';
import { Timestamp } from 'firebase/firestore';
import SetCategoryBudgetModal from '@/components/SetCategoryBudgetModal';
import { getAllCategoryBudgets, addCategoryBudget } from '@/firebase/api';

interface Account {
  id: string;
  accountName: string;
  accountType: string;
  balance: number;
  createdAt: Timestamp;
  userId: string;
}

interface CategoryData {
  category: string;
  spentAmount: number;
  budgetedAmount: number;
}

const DashboardPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [amountSpent, setAmountSpent] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("Income");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoryBudgets, setCategoryBudgets] = useState<any[]>([]);
  const [isCategoryBudgetModalOpen, setIsCategoryBudgetModalOpen] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const transactionsPerPage = 10;

  const fetchAccountDetails = useCallback(async () => {
    if (user) {
      try {
        const account = await getAccount(user.uid) as Account;
        if (account) {
          setBalance(account.balance);
          setAccountId(account.id); // Store accountId in state
          await fetchTransactions(account.id);
        } else {
          console.error('No account found for user:', user.uid);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }
  }, [user]);

  const fetchTransactions = useCallback(async (accountId: string) => {
    if (user) {
      try {
        const userTransactions = await getTransactions(user.uid, selectedMonth, currentPage, transactionsPerPage);
        if (userTransactions.length === 0) {
          console.log('No transactions found');
          setTransactions(userTransactions)
          calculateAmountSpent(userTransactions)
          fetchCategoryBudgets(user.uid, userTransactions)
        } else {
          setTransactions(userTransactions);
          calculateAmountSpent(userTransactions);
          fetchCategoryBudgets(user.uid, userTransactions); // Pass transactions here
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  }, [user, selectedMonth, currentPage]);

  const fetchCategoryBudgets = useCallback(async (userId: string, transactions: any[]) => {
    try {
      const budgets = await getAllCategoryBudgets(userId);
      const categoryMap: { [key: string]: number } = {};
      
      // Calculate spent amount from transactions
      transactions.forEach((transaction) => {
        if (transaction.type === "expense") {
          if (!categoryMap[transaction.category]) {
            categoryMap[transaction.category] = 0;
          }
          categoryMap[transaction.category] += transaction.amount;
        }
      });

      // Create category data with both budgeted and spent amounts
      const categoryData = budgets.map(budget => ({
        category: budget.category,
        budgetedAmount: budget.amount,
        spentAmount: categoryMap[budget.category] || 0
      }));

      setCategoryData(categoryData);
    } catch (error) {
      console.error('Error fetching category budgets:', error);
    }
  }, []);

  const calculateAmountSpent = useCallback((transactions: any[]) => {
    const totalSpent = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setAmountSpent(totalSpent);
  }, []);

  const handleAddTransaction = async (
    amount: string,
    category: string,
    type: "expense" | "income",
    description: string
  ) => {
    if (user) {
      const transactionAmount = parseFloat(amount);
      if (isNaN(transactionAmount) || transactionAmount <= 0) {
        setError("Amount must be a valid number greater than zero");
        return;
      }
      setError(null);
  
      try {
        const currentAccount = await getAccount(user.uid) as Account;
        if (!currentAccount) {
          setError("Account not found");
          return;
        }
        const accountId = currentAccount.id;
        if (!accountId) {
          setError("Account ID is missing");
          return;
        }
  
        let newBalance = currentAccount.balance;
        if (type === "expense") {
          newBalance -= transactionAmount;
        } else if (type === "income") {
          newBalance += transactionAmount;
        }
  
        await updateAccountBalance(accountId, newBalance);
        await addTransaction(
          user.uid,
          accountId,
          transactionAmount,
          category,
          type,
          new Date(),
          description || ""
        );
  
        const updatedTransactions = [
          ...transactions,
          { amount: transactionAmount, category, type, date: new Date() }
        ];
  
        setTransactions(updatedTransactions);
        setBalance(newBalance);
        setIsModalOpen(false);
        resetFormFields();
        fetchCategoryBudgets(user.uid, updatedTransactions);
      } catch (error) {
        console.error('Error adding transaction:', error);
        setError('An error occurred while adding the transaction.');
      }
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const downloadTransactionsToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, `transactions_${selectedMonth}.xlsx`);
  };

  const resetFormFields = () => {
    setAmount("");
    setCategory("Income");
    setType("expense");
    setDescription("");
    setError(null);
  };

  useEffect(() => {
    if (user && accountId) {
      fetchTransactions(accountId);
    }
  }, [user, selectedMonth, currentPage, accountId, fetchTransactions]);

  useEffect(() => {
    if (user) {
      fetchAccountDetails();
    }
  }, [user, fetchAccountDetails]);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Transaction
          </button>
        </div>

        <AccountSummary
          balance={balance}
          amountSpent={amountSpent}
          openCategoryBudgetModal={() => setIsCategoryBudgetModalOpen(true)}
        />

        <div className="mb-12">
          <input
            type="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-gray-300"
          />
        </div>

        <div className="relative mb-12">
          <TransactionList
            transactions={transactions}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            downloadTransactionsToExcel={downloadTransactionsToExcel}
            currentPage={currentPage}
          />
        </div>

        <SpendingCategoryChart categoryData={categoryData} />

        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleAddTransaction={handleAddTransaction}
          error={error}
        />
        <SetCategoryBudgetModal
          isOpen={isCategoryBudgetModalOpen}
          onClose={() => setIsCategoryBudgetModalOpen(false)}
          userId={user?.uid || ''}
          fetchCategoryBudgets={fetchCategoryBudgets}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);