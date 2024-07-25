import React, { useEffect, useState } from "react";
import { getAllCategoryBudgets, updateCategoryBudget } from "@/firebase/api";
import { expense_categories } from "@/util/constant";

interface SetCategoryBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  fetchCategoryBudgets: (userId: string, transactions: any[]) => void; // Pass fetchCategoryBudgets as a prop
  transactions: any[]; // Pass transactions as a prop
}

interface CategoryBudget {
  category: string;
  amount: number;
}

const SetCategoryBudgetModal: React.FC<SetCategoryBudgetModalProps> = ({
  isOpen,
  onClose,
  userId,
  fetchCategoryBudgets,
  transactions
}) => {
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchCategoryBudgetsData();
    }
  }, [userId]);

  const fetchCategoryBudgetsData = async () => {
    try {
      const budgets = await getAllCategoryBudgets(userId);
      setCategoryBudgets(budgets);
    } catch (error) {
      console.error("Error fetching category budgets:", error);
      setError("An error occurred while fetching category budgets.");
    }
  };

  const handleAmountChange = (index: number, amount: string) => {
    const updatedBudgets = [...categoryBudgets];
    updatedBudgets[index].amount = parseFloat(amount);
    setCategoryBudgets(updatedBudgets);
  };

  const handleSaveBudgets = async () => {
    try {
      for (const budget of categoryBudgets) {
        await updateCategoryBudget(userId, budget.category, budget.amount);
      }
      fetchCategoryBudgets(userId, transactions); // Update the bar graph after saving the budget
      onClose();
    } catch (error) {
      console.error("Error updating category budgets:", error);
      setError("An error occurred while updating category budgets.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Set Category Budget</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4 overflow-auto max-h-80">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-gray-300">Category</th>
                <th className="px-4 py-2 text-left text-gray-300">Amount</th>
              </tr>
            </thead>
            <tbody>
              {categoryBudgets.map((budget, index) => (
                <tr key={budget.category}>
                  <td className="px-4 py-2 text-gray-300">{budget.category}</td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={budget.amount}
                      onChange={(e) => handleAmountChange(index, e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-gray-300 font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveBudgets}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetCategoryBudgetModal;