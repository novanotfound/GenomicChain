'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    id: 1,
    question: "How does GenomicChain ensure the security of my DNA data?",
    answer: "GenomicChain uses multiple layers of security. First, all data is encrypted end-to-end before being stored. Second, the blockchain technology creates an immutable record of all access attempts. Third, smart contracts control who can access your data, requiring cryptographic verification for each access request."
  },
  {
    id: 2,
    question: "Who can access my genomic data?",
    answer: "Only you and those you explicitly grant permission to can access your genomic data. The platform uses smart contracts to enforce access controls, and you can revoke access at any time. Every access attempt is logged on the blockchain for complete transparency."
  },
  {
    id: 3,
    question: "How does the blockchain verification process work?",
    answer: "When your data is stored, it's encrypted and a cryptographic hash is created and stored on the blockchain. This hash acts as a digital fingerprint that can verify the data hasn't been altered. Each access request is also recorded as a transaction on the blockchain, creating a permanent and transparent audit trail."
  },
  {
    id: 4,
    question: "Can I control which parts of my genomic data are shared?",
    answer: "Yes, GenomicChain offers granular access control. You can specify which segments of your genomic data are accessible to different researchers or organizations. This allows you to participate in specific research studies without exposing your entire genomic profile."
  },
  {
    id: 5,
    question: "What happens if I want to remove my data from the platform?",
    answer: "You can revoke access to your data at any time. While blockchain records are immutable, the actual genomic data can be encrypted with new keys that render previous access obsolete. The platform also supports requests for data deletion in compliance with privacy regulations like GDPR."
  },
  {
    id: 6,
    question: "Is GenomicChain compliant with healthcare data regulations?",
    answer: "Yes, GenomicChain is designed to comply with major healthcare data regulations including HIPAA, GDPR, and other regional privacy laws. The platform's access controls, encryption standards, and audit capabilities meet or exceed regulatory requirements for sensitive health information."
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about genomic data security and blockchain technology.
          </motion.p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div 
              key={faq.id}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className="w-full flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-dna-blue"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-xl font-semibold text-left text-gray-900 dark:text-white">{faq.question}</h3>
                <div className="ml-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {activeIndex === index ? (
                    <FiChevronUp className="w-5 h-5" />
                  ) : (
                    <FiChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white dark:bg-gray-800 px-6 pt-0 pb-6 rounded-b-xl shadow-md mt-px">
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* DNA Animation */}
        <div className="mt-20 relative">
          <div className="absolute -top-20 right-0 w-40 h-40 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="faqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3490dc" />
                  <stop offset="100%" stopColor="#38a169" />
                </linearGradient>
              </defs>
              <g className="rotating-dna">
                {[...Array(5)].map((_, i) => (
                  <g key={i} className="dna-pair" style={{ transform: `rotate(${i * 45}deg)` }}>
                    <circle cx="30" cy="50" r="4" fill="url(#faqGradient)" />
                    <circle cx="70" cy="50" r="4" fill="url(#faqGradient)" />
                    <line x1="34" y1="50" x2="66" y2="50" stroke="url(#faqGradient)" strokeWidth="2" />
                  </g>
                ))}
              </g>
            </svg>
          </div>
          
          {/* Additional Support Message */}
          <div className="py-8 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Still Have Questions?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our team is here to help with any questions about genomic data security, blockchain technology, or how to use the GenomicChain platform.
            </p>
            <div className="flex justify-center">
              <button className="dna-button">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for DNA animation */}
      <style jsx>{`
        .rotating-dna {
          transform-origin: center;
          animation: rotate 20s linear infinite;
        }
        
        .dna-pair {
          transform-origin: center;
        }
        
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default FAQSection; 