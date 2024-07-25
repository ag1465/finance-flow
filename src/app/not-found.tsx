import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Oops! The page you're looking for isn't here.</p>
      <Image 
        src="/404.png"
        alt="404 Image" 
        width={400} 
        height={400}
        className="mb-8 animate-bounce"
      />
      <Link href="/" legacyBehavior>
        <a className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Go back home
        </a>
      </Link>
    </div>
  );
};

export default NotFoundPage;