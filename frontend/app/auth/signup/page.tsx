'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheck } from 'react-icons/fi';

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', fulfilled: password.length >= 8 },
    { id: 'lowercase', label: 'One lowercase letter', fulfilled: /[a-z]/.test(password) },
    { id: 'uppercase', label: 'One uppercase letter', fulfilled: /[A-Z]/.test(password) },
    { id: 'number', label: 'One number', fulfilled: /[0-9]/.test(password) },
    { id: 'special', label: 'One special character', fulfilled: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  const passwordStrength = passwordRequirements.filter(req => req.fulfilled).length;
  
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
      if (!email || !name) {
        setError('Please fill in all fields');
        return;
      }
      setStep(2);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Please create a stronger password');
      return;
    }
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, mock successful signup
      router.push('/auth/login?signup=success');
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
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
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-dna-blue to-dna-green text-xl">🧬</span>
            </div>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Join the secure blockchain DNA storage platform
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

          {/* Step indicator */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-dna-blue text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                1
              </div>
              <div className={`h-1 w-10 mx-1 ${step >= 2 ? 'bg-dna-blue' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-dna-blue text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                2
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {step} of 2
            </div>
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

          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="dna-input pl-10 w-full"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
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
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      className="dna-input pl-10 pr-10 w-full"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showPassword ? (
                          <FiEyeOff className="h-5 w-5" />
                        ) : (
                          <FiEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex h-2 mb-4 mt-2">
                      <div className={`flex-1 rounded-l-full ${passwordStrength >= 1 ? getPasswordStrengthColor() : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                      <div className={`flex-1 ${passwordStrength >= 2 ? getPasswordStrengthColor() : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                      <div className={`flex-1 ${passwordStrength >= 3 ? getPasswordStrengthColor() : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                      <div className={`flex-1 ${passwordStrength >= 4 ? getPasswordStrengthColor() : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                      <div className={`flex-1 rounded-r-full ${passwordStrength >= 5 ? getPasswordStrengthColor() : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {passwordRequirements.map((requirement) => (
                        <div key={requirement.id} className="flex items-center text-xs">
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full mr-2 flex items-center justify-center ${requirement.fulfilled ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                            {requirement.fulfilled && <FiCheck className="h-3 w-3 text-green-500 dark:text-green-400" />}
                          </div>
                          <span className={requirement.fulfilled ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                            {requirement.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className={`dna-input pl-10 pr-10 w-full ${
                        confirmPassword && password !== confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
                      }`}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="h-5 w-5" />
                        ) : (
                          <FiEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">Passwords do not match</p>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 text-dna-blue focus:ring-dna-blue border-gray-300 rounded"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      I agree to the{' '}
                      <Link href="/terms" className="font-medium text-dna-blue hover:text-dna-blue/80">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="font-medium text-dna-blue hover:text-dna-blue/80">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center justify-between">
              {step === 2 && (
                <button
                  type="button"
                  className="dna-button-outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`dna-button ${step === 1 ? 'w-full' : 'ml-auto'} flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {step === 1 ? 'Next' : 'Creating account...'}
                  </div>
                ) : (
                  step === 1 ? 'Next' : 'Create account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-dna-blue hover:text-dna-blue/80">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage; 