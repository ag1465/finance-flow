import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Total Income */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Income</h2>
            <p className="text-2xl">$23,500</p>
          </div>
          {/* Total Expenses */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Expenses</h2>
            <p className="text-2xl">$15,000</p>
          </div>
          {/* Savings */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Savings</h2>
            <p className="text-2xl">$8,500</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Expenses by Category */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Expenses by Category</h2>
            {/* Placeholder for chart */}
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
          {/* Income vs Expenses */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Income vs Expenses</h2>
            {/* Placeholder for chart */}
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-bold">Recent Transactions</h2>
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Amount</th>
                <th className="py-2 px-4 border">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">01/01/2022</td>
                <td className="py-2 px-4 border">Groceries</td>
                <td className="py-2 px-4 border">$150</td>
                <td className="py-2 px-4 border">Weekly groceries</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Budget */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Budget</h2>
            {/* Placeholder for budget progress */}
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
          {/* Savings Goals */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Savings Goals</h2>
            {/* Placeholder for savings goals */}
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
