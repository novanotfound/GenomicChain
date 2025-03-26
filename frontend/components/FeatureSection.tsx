'use client';

import { motion } from 'framer-motion';
import { FiLock, FiShield, FiDatabase, FiUsers, FiKey, FiActivity } from 'react-icons/fi';
import Image from 'next/image';

const features = [
  {
    id: 1,
    icon: <FiLock className="w-6 h-6" />,
    title: 'End-to-End Encryption',
    description: 'Your genomic data is encrypted from the moment it leaves your device until it reaches our secure blockchain.',
    color: 'bg-dna-blue text-white',
  },
  {
    id: 2,
    icon: <FiShield className="w-6 h-6" />,
    title: 'Immutable Storage',
    description: 'Once stored, your data cannot be modified or tampered with, ensuring the highest level of data integrity.',
    color: 'bg-dna-green text-white',
  },
  {
    id: 3,
    icon: <FiUsers className="w-6 h-6" />,
    title: 'Granular Access Control',
    description: 'Grant and revoke access to specific parts of your genomic data on a per-user or per-organization basis.',
    color: 'bg-dna-red text-white',
  },
  {
    id: 4,
    icon: <FiKey className="w-6 h-6" />,
    title: 'Private Key Ownership',
    description: 'You maintain full ownership of your private keys, meaning only you can grant access to your data.',
    color: 'bg-dna-yellow text-gray-900',
  },
  {
    id: 5,
    icon: <FiActivity className="w-6 h-6" />,
    title: 'Activity Monitoring',
    description: 'Track every interaction with your genomic data in real-time with a complete audit trail.',
    color: 'bg-dna-blue text-white',
  },
  {
    id: 6,
    icon: <FiDatabase className="w-6 h-6" />,
    title: 'Distributed Storage',
    description: 'Your data is securely distributed across multiple nodes, eliminating single points of failure.',
    color: 'bg-dna-green text-white',
  },
];

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const FeatureSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      {/* DNA Strand Decorative Element */}
      <div className="absolute left-0 h-full w-1/12 overflow-hidden opacity-10">
        <div className="dna-strand-vertical h-full w-4 mx-auto">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="dna-rung-vertical" style={{ top: `${i * 5}%` }}>
              <div className="w-2 h-2 rounded-full bg-dna-blue"></div>
              <div className="w-2 h-2 rounded-full bg-dna-green ml-4"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-dna-blue to-dna-green">
              Powerful Features
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            GenomicChain combines blockchain security with genomic data management to give you complete control and peace of mind.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              className="dna-card flex"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={featureVariants}
            >
              <div className={`${feature.color} p-4 rounded-l-xl flex items-center justify-center`}>
                {feature.icon}
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Advanced Feature Highlight */}
        <motion.div 
          className="mt-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Blockchain DNA Verification
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our advanced blockchain verification system ensures that your genomic data remains 
                tamper-proof and verifiable. Every transaction is recorded on the blockchain, 
                creating an immutable record of all data access and modifications.
              </p>
              <ul className="space-y-3">
                {[
                  'Cryptographic verification of data integrity',
                  'Smart contract-based access control',
                  'Decentralized storage prevents single points of failure',
                  'Full transaction history for complete auditability'
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <div className="mr-2 mt-1 bg-gradient-to-r from-dna-blue to-dna-green p-0.5 rounded-full">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-auto bg-gradient-to-br from-dna-blue/20 to-dna-green/20 flex items-center justify-center p-6">
              <div className="relative w-full h-full max-w-sm mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-xs max-h-xs relative">
                    {/* DNA + Blockchain Visualization */}
                    <div className="blockchain-dna-visual">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="blockchain-block" style={{ animationDelay: `${i * 0.5}s` }}>
                          <div className="block-header bg-dna-blue/80"></div>
                          <div className="block-content">
                            <div className="dna-strand-mini"></div>
                          </div>
                          <div className="block-connector"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* CSS for DNA strands and blockchain visualization */}
      <style jsx>{`
        .dna-strand-vertical {
          position: relative;
        }
        
        .dna-rung-vertical {
          position: absolute;
          display: flex;
          animation: pulse 2s ease-in-out infinite alternate;
        }
        
        .blockchain-dna-visual {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .blockchain-block {
          width: 80%;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          border-radius: 8px;
          margin-bottom: 20px;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          animation: pulse-block 3s ease-in-out infinite alternate;
          overflow: hidden;
        }
        
        .block-header {
          height: 8px;
          width: 100%;
        }
        
        .block-content {
          padding: 8px;
          height: calc(100% - 16px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .block-connector {
          position: absolute;
          bottom: -20px;
          left: 50%;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, #3490dc, transparent);
          z-index: 1;
        }
        
        .dna-strand-mini {
          width: 90%;
          height: 4px;
          background: linear-gradient(to right, #3490dc, #38a169);
          position: relative;
        }
        
        .dna-strand-mini::before,
        .dna-strand-mini::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          top: -2px;
        }
        
        .dna-strand-mini::before {
          left: 10%;
          background-color: #3490dc;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .dna-strand-mini::after {
          right: 10%;
          background-color: #38a169;
          animation: pulse 1.5s ease-in-out infinite reverse;
        }
        
        @keyframes pulse-block {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-3px) scale(1.02);
          }
        }
      `}</style>
    </section>
  );
};

export default FeatureSection; 