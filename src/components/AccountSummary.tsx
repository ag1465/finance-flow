import { FC } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface AccountSummaryProps {
  balance: number;
  amountSpent: number;
  openCategoryBudgetModal: () => void;
}

const AccountSummary: FC<AccountSummaryProps> = ({ balance, amountSpent, openCategoryBudgetModal }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
        <h2 className="text-xl font-semibold text-gray-400">Balance</h2>
        <p className="text-3xl font-bold text-white mt-2">${balance?.toFixed(2)}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
        <h2 className="text-xl font-semibold text-gray-400">Amount Spent</h2>
        <p className="text-3xl font-bold text-white mt-2">${amountSpent?.toFixed(2)}</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center relative">
        <h2 className="text-xl font-semibold text-gray-400">Monthly Budget</h2>
        <button
          onClick={openCategoryBudgetModal}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Set Category Budget
        </button>
      </div>
    </div>
  );
};

export default AccountSummary;