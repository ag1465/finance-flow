import { FC } from 'react';
import CategoryBarChart from '@/components/CategoryBarChart';

interface CategoryData {
  category: string;
  spentAmount: number;
  budgetedAmount: number;
}

interface SpendingCategoryChartProps {
  categoryData: CategoryData[];
}

const SpendingCategoryChart: FC<SpendingCategoryChartProps> = ({ categoryData }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg mt-8 w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Spending by Category</h2>
      <CategoryBarChart data={categoryData} />
    </div>
  );
};

export default SpendingCategoryChart;