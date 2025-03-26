'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiAlertCircle, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed
      setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-gradient-to-r from-dna-blue to-dna-green rounded-full opacity-80"></div>
            <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-dna-blue to-dna-green text-xl">GC</span>
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {isSubmitted ? 'Check your email' : 'Reset your password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {isSubmitted 
            ? 'We\'ve sent a password reset link to your email' 
            : 'Enter your email address and we\'ll send you a link to reset your password'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="bg-white dark:bg-gray-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* DNA Pattern Background */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3490dc" />
                  <stop offset="100%" stopColor="#38a169" />
                </linearGradient>
              </defs>
              {[...Array(10)].map((_, i) => (
                <g key={i} className="dna-strand" style={{ animationDelay: `${i * 0.1}s` }}>
                  <path
                    d={`M ${10 + (i * 8)} 0 Q ${50 + (Math.sin(i) * 20)} ${50} ${10 + (i * 8)} 100`}
                    fill="none"
                    stroke="url(#dnaGradient)"
                    strokeWidth="0.5"
                  />
                  {[...Array(5)].map((_, j) => (
                    <circle
                      key={j}
                      cx={10 + (i * 8) + (Math.sin(j * Math.PI / 5) * 2)}
                      cy={j * 20}
                      r="1"
                      fill="url(#dnaGradient)"
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>

          {error && (
            <motion.div 
              className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 flex items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FiAlertCircle className="h-5 w-5 text-red-400 dark:text-red-500 mt-0.5 mr-3" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20">
                <FiCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've sent an email to <span className="font-medium text-gray-900 dark:text-white">{email}</span> with instructions to reset your password.
                </p>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSubmitted(false)} 
                    className="font-medium text-dna-blue hover:text-dna-blue/80"
                  >
                    try again
                  </button>
                </p>
              </div>
              <div className="mt-6">
                <Link 
                  href="/auth/login" 
                  className="flex items-center justify-center font-medium text-dna-blue hover:text-dna-blue/80"
                >
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.form 
              className="space-y-6" 
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="dna-input pl-10 w-full"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="dna-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending reset link...
                    </div>
                  ) : 'Send reset link'}
                </button>
              </div>

              <div className="text-center">
                <Link 
                  href="/auth/login" 
                  className="flex items-center justify-center font-medium text-dna-blue hover:text-dna-blue/80"
                >
                  <FiArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 