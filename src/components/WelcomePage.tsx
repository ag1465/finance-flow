'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import backgroundImage from '../../public/finance-flow-backgrounnd-image.jpg';
import calculatorImage from '../../public/calculator.png';

const WelcomePage: FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <Image
        src={backgroundImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0 opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-90 z-10"></div>
      <div className="relative z-20 flex items-center justify-center min-h-screen">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="pb-10 sm:pb-16 md:pb-24 lg:pb-32 xl:pb-40">
            <main className="mt-12 mx-auto max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-20 lg:mt-24 lg:px-8 xl:mt-32 flex flex-col lg:flex-row items-center lg:items-start lg:space-x-16 text-center lg:text-left">
              <div className="lg:flex-1">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to </span>
                  <span className="block text-indigo-500 xl:inline">Finance Flow</span>
                </h1>
                <p className="mt-4 text-base text-gray-300 sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0">
                  Manage your finances with ease and efficiency. Track expenses, create budgets, and get insights to make informed decisions.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/dashboard" legacyBehavior>
                      <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                        Get Started
                      </a>
                    </Link>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-4">
                    <Link href="/learn-more" legacyBehavior>
                      <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10">
                        Learn More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:ml-16 lg:flex-1 lg:flex lg:justify-end">
                <Image
                  src={calculatorImage}
                  alt="Calculator Image"
                  width={400}
                  height={400}
                  className="animate-float"
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;