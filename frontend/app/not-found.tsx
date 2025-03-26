'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8 mx-auto w-40 h-40">
            {/* DNA helix animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="dna-strand absolute left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-dna-blue">404</div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            The DNA sequence you're looking for doesn't exist in our database.
          </p>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-dna-blue hover:bg-dna-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dna-blue"
          >
            <FiHome className="mr-2" /> Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dna-blue"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </button>
        </motion.div>
        
        <motion.div
          className="mt-12 text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Need help? <Link href="/contact" className="text-dna-blue hover:underline">Contact Support</Link>
          </p>
        </motion.div>
      </div>
      
      <style jsx>{`
        .dna-strand {
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent 0%, #3b82f6 50%, transparent 100%);
          animation: rotate 5s linear infinite;
        }
        
        .dna-strand:before,
        .dna-strand:after {
          content: '';
          position: absolute;
          width: 16px;
          height: 2px;
          background-color: #3b82f6;
          animation: pulse 1s ease-in-out infinite alternate;
        }
        
        .dna-strand:before {
          left: 0;
          animation-delay: 0s;
        }
        
        .dna-strand:after {
          right: 0;
          animation-delay: 0.5s;
        }
        
        @keyframes rotate {
          0% { transform: translateX(-50%) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
} 