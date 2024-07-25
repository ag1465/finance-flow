'use client';

import { FC } from 'react';
import Link from 'next/link';

const LearnMorePage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Learn More About</span>{' '}
                  <span className="block text-indigo-500 xl:inline">Finance Flow</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Finance Flow is your ultimate tool to manage personal and professional finances with ease and efficiency.
                  Discover how our features can help you stay on top of your financial goals.
                </p>
              </div>
              <div className="mt-10">
                <h2 className="text-2xl font-extrabold text-indigo-500">Key Features</h2>
                <ul className="mt-5 text-gray-300">
                  <li className="mt-2">
                    <span className="font-bold text-white">Expense Tracking:</span> Keep track of all your expenses in one place.
                  </li>
                  <li className="mt-2">
                    <span className="font-bold text-white">Budget Management:</span> Create and manage your budgets easily.
                  </li>
                  <li className="mt-2">
                    <span className="font-bold text-white">Financial Insights:</span> Get detailed reports and insights into your spending habits.
                  </li>
                  <li className="mt-2">
                    <span className="font-bold text-white">Security:</span> Your financial data is protected with top-notch security measures.
                  </li>
                </ul>
              </div>
              <div className="mt-10">
                <Link href="/" legacyBehavior>
                  <button className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Go Back to Homepage
                  </button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
