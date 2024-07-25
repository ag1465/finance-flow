import React from "react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface TransactionListProps {
  transactions: any[];
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  downloadTransactionsToExcel: () => void;
  currentPage: number;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  handlePreviousPage,
  handleNextPage,
  downloadTransactionsToExcel,
  currentPage,
}) => {
  const transactionsPerPage = 5;
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const displayedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className="relative bg-gray-900 p-6 rounded-xl shadow-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right">
                <button
                  onClick={downloadTransactionsToExcel}
                  className="p-2 rounded-full hover:bg-indigo-500 transition-colors duration-150 ease-in-out"
                  style={{ backgroundColor: '#4F46E5' }}
                  aria-label="Download Transactions"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 text-white" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {displayedTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                  No transactions available.
                </td>
              </tr>
            ) : (
              displayedTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {new Date(transaction.date.seconds * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {transaction.description}
                  </td>
                  <td></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-gray-300 font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-300 font-medium">
            Page {currentPage}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-700 text-gray-300 font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
