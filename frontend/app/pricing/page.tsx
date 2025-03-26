'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiHelpCircle } from 'react-icons/fi';
import Link from 'next/link';

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly');
  };

  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Essential features for individuals',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: [
        '5GB encrypted DNA data storage',
        'Basic access control',
        'Blockchain verification',
        'Standard support',
        '1 user account'
      ],
      cta: 'Start Basic',
      color: 'blue',
      popular: false
    },
    {
      name: 'Professional',
      description: 'Perfect for healthcare professionals',
      monthlyPrice: 29.99,
      annualPrice: 299.99,
      features: [
        '50GB encrypted DNA data storage',
        'Advanced access control',
        'Priority blockchain verification',
        '24/7 support',
        'Up to 5 user accounts',
        'Detailed audit logs',
        'API access'
      ],
      cta: 'Start Professional',
      color: 'green',
      popular: true
    },
    {
      name: 'Enterprise',
      description: 'For research institutions and hospitals',
      monthlyPrice: 99.99,
      annualPrice: 999.99,
      features: [
        'Unlimited encrypted DNA data storage',
        'Custom access control policies',
        'Dedicated blockchain network',
        'Priority 24/7 support with SLA',
        'Unlimited user accounts',
        'Advanced analytics',
        'Custom API integration',
        'Compliance package (HIPAA, GDPR)'
      ],
      cta: 'Contact Sales',
      color: 'purple',
      popular: false
    }
  ];

  return (
    <div className="py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the plan that fits your needs. All plans include our core blockchain security features.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`text-sm ${billingPeriod === 'monthly' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Monthly
            </span>
            <button 
              onClick={toggleBillingPeriod}
              className="mx-4 relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              aria-checked={billingPeriod === 'annual'}
            >
              <span 
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-sm ${billingPeriod === 'annual' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
              Annual <span className="text-dna-green">(-17%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ${plan.popular ? 'ring-2 ring-dna-green dark:ring-dna-green md:scale-105 z-10' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="bg-dna-green text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <Link 
                  href={plan.name === 'Enterprise' ? '/contact' : '/auth/signup'} 
                  className={`block w-full py-3 px-4 rounded-md text-center text-white font-medium ${
                    plan.color === 'blue' 
                      ? 'bg-dna-blue hover:bg-dna-blue/90' 
                      : plan.color === 'green' 
                        ? 'bg-dna-green hover:bg-dna-green/90' 
                        : 'bg-purple-600 hover:bg-purple-700'
                  } transition-colors mb-6`}
                >
                  {plan.cta}
                </Link>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="h-5 w-5 text-dna-green flex-shrink-0 mr-2 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be billed the prorated amount for the remainder of your billing cycle. When downgrading, the new lower rate will apply at the start of your next billing cycle.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Is there a free trial available?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Yes, we offer a 14-day free trial for our Basic and Professional plans. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We accept major credit cards (Visa, MasterCard, American Express) and PayPal. For Enterprise plans, we also offer invoice-based payment with net 30 terms.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Still have questions?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your needs. Contact us for a personalized consultation.
          </p>
          <Link 
            href="/contact" 
            className="dna-button inline-flex items-center text-white py-3 px-8 rounded-md text-lg font-medium"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 