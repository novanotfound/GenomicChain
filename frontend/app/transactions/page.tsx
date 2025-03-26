'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiFilter, FiSearch, FiExternalLink, FiClock, FiDownload, FiUpload, FiLock, FiUnlock, FiInfo } from 'react-icons/fi';
import Link from 'next/link';

// Mock transaction data
const mockTransactions = [
  {
    id: 'tx-0x7a92b',
    type: 'upload',
    fileName: 'genome_sequence_v2.fasta',
    date: '2 hours ago',
    timestamp: '2023-06-10T14:32:42Z',
    hash: '0x7a92b6e03a8a0e4cb03213e5fee77e7efd2c442e5dae3fad6544d22a567a8bc2',
    status: 'confirmed',
    gasUsed: '0.00042 ETH',
    confirmation: 'Confirmed (246 blocks)',
    user: 'You',
  },
  {
    id: 'tx-0x3d41f',
    type: 'access_granted',
    fileName: 'genome_sequence_v1.fasta',
    date: '1 day ago',
    timestamp: '2023-06-09T09:15:23Z',
    hash: '0x3d41f6aef3fdea55491cdbe25c957fe6d81bf5af71225e8f4d57e95c7de9063c',
    status: 'confirmed',
    gasUsed: '0.00036 ETH',
    confirmation: 'Confirmed (1,293 blocks)',
    user: 'Dr. Sarah Johnson',
  },
  {
    id: 'tx-0x9e82c',
    type: 'download',
    fileName: 'genome_sequence_v1.fasta',
    date: '1 day ago',
    timestamp: '2023-06-09T10:42:18Z',
    hash: '0x9e82c28903b812d62a20a3f2705eaf57b12b518ee29e955e19e3abe8a181cd86',
    status: 'confirmed',
    gasUsed: '0.00018 ETH',
    confirmation: 'Confirmed (1,252 blocks)',
    user: 'Dr. Sarah Johnson',
  },
  {
    id: 'tx-0x51c7d',
    type: 'access_revoked',
    fileName: 'proteomics_data.xlsx',
    date: '3 days ago',
    timestamp: '2023-06-07T16:23:45Z',
    hash: '0x51c7d67998b53e92f0f32a9f22b4bb4ef9acfd7639e3127b5c9240d673a84e38',
    status: 'confirmed',
    gasUsed: '0.00039 ETH',
    confirmation: 'Confirmed (4,502 blocks)',
    user: 'Medical Research Lab',
  },
  {
    id: 'tx-0x12a3f',
    type: 'upload',
    fileName: 'clinical_trial_results.csv',
    date: '1 week ago',
    timestamp: '2023-06-03T11:09:32Z',
    hash: '0x12a3f5ab4cd7e9832b5e7f45c2394b3d8e9ea9a25cb41d816ad8f217d4a8654b',
    status: 'confirmed',
    gasUsed: '0.00045 ETH',
    confirmation: 'Confirmed (9,873 blocks)',
    user: 'You',
  },
];

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransactionType, setSelectedTransactionType] = useState('all');
  
  // Filter transactions based on search query and selected type
  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch = 
      tx.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.user.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedTransactionType === 'all' || tx.type === selectedTransactionType;
    
    return matchesSearch && matchesType;
  });

  // Function to get appropriate icon and color for transaction type
  const getTransactionTypeInfo = (type: string) => {
    switch (type) {
      case 'upload':
        return { icon: <FiUpload className="w-5 h-5" />, bgColor: 'bg-dna-blue/10', textColor: 'text-dna-blue' };
      case 'download':
        return { icon: <FiDownload className="w-5 h-5" />, bgColor: 'bg-dna-green/10', textColor: 'text-dna-green' };
      case 'access_granted':
        return { icon: <FiUnlock className="w-5 h-5" />, bgColor: 'bg-dna-yellow/10', textColor: 'text-dna-yellow' };
      case 'access_revoked':
        return { icon: <FiLock className="w-5 h-5" />, bgColor: 'bg-dna-red/10', textColor: 'text-dna-red' };
      default:
        return { icon: <FiActivity className="w-5 h-5" />, bgColor: 'bg-gray-100', textColor: 'text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blockchain Transactions</h1>
            <p className="text-gray-600 dark:text-gray-300">View all blockchain transactions related to your genomic data</p>
          </div>
        </motion.div>
        
        {/* Search and Filter */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="dna-input w-full pl-10"
                placeholder="Search by filename, transaction hash, or user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 dark:text-gray-400 mr-2">Type:</span>
              <select
                className="dna-input"
                value={selectedTransactionType}
                onChange={(e) => setSelectedTransactionType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="upload">Upload</option>
                <option value="download">Download</option>
                <option value="access_granted">Access Granted</option>
                <option value="access_revoked">Access Revoked</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Transactions List */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Transaction History</h2>
          </div>
          
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions.map((transaction) => {
                const { icon, bgColor, textColor } = getTransactionTypeInfo(transaction.type);
                
                return (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-full ${bgColor} ${textColor}`}>
                          {icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {transaction.type === 'upload' ? 'Uploaded' :
                             transaction.type === 'download' ? 'Downloaded' :
                             transaction.type === 'access_granted' ? 'Access Granted' :
                             'Access Revoked'} 
                            <span className="font-semibold"> {transaction.fileName}</span>
                          </h3>
                          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <FiClock className="w-4 h-4 mr-1" />
                            <span>{transaction.date}</span>
                            <span className="mx-2">•</span>
                            <span>By {transaction.user}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <a
                          href={`https://etherscan.io/tx/${transaction.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm leading-5 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:text-gray-500 dark:hover:text-white focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                        >
                          <FiExternalLink className="w-4 h-4 mr-1" />
                          View on Explorer
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Transaction Hash</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-300 font-mono truncate">
                          {transaction.hash}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                        <p className="mt-1 text-green-600 dark:text-green-400 flex items-center">
                          <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-2"></span>
                          {transaction.confirmation}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Gas Used</p>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{transaction.gasUsed}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No transactions found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{mockTransactions.length}</span> transactions
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Blockchain Information */}
        <motion.div 
          className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About Blockchain Transactions</h3>
          <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300">
            <p>
              All interactions with your genomic data are recorded on the blockchain as transactions. 
              These transactions form an immutable audit trail that can't be altered, ensuring complete transparency and accountability.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Transaction Types</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-dna-blue/10 text-dna-blue mr-2">
                      <FiUpload className="w-4 h-4" />
                    </div>
                    <span>Upload - Storing new genomic data on the blockchain</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-dna-green/10 text-dna-green mr-2">
                      <FiDownload className="w-4 h-4" />
                    </div>
                    <span>Download - Retrieving genomic data from storage</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-dna-yellow/10 text-dna-yellow mr-2">
                      <FiUnlock className="w-4 h-4" />
                    </div>
                    <span>Access Granted - Permitting others to access your data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-dna-red/10 text-dna-red mr-2">
                      <FiLock className="w-4 h-4" />
                    </div>
                    <span>Access Revoked - Removing access permissions</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Transaction Security</h4>
                <p>
                  Each transaction is cryptographically signed and verified by the blockchain network. 
                  Once confirmed, it becomes part of the permanent record, providing:
                </p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Proof of data integrity</li>
                  <li>Verifiable access history</li>
                  <li>Tamper-proof audit trail</li>
                  <li>Decentralized verification</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionsPage; 