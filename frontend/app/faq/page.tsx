'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiChevronDown, FiChevronUp, FiSearch, FiArrowRight, FiLock } from 'react-icons/fi';

type FAQCategory = 'all' | 'general' | 'security' | 'privacy' | 'technical' | 'pricing';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: Exclude<FAQCategory, 'all'>;
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const faqs: FAQ[] = [
    {
      id: 'general-1',
      question: 'What is GenomicChain?',
      answer: 'GenomicChain is a secure platform that uses blockchain technology to store and manage genomic data. It provides end-to-end encryption, granular access controls, and an immutable audit trail for all data transactions, ensuring your genetic information remains private and secure.',
      category: 'general'
    },
    {
      id: 'general-2',
      question: 'Who can benefit from using GenomicChain?',
      answer: 'GenomicChain is designed for researchers, healthcare providers, pharmaceutical companies, and individuals who need to securely store, manage, and share genomic data. It\'s particularly valuable for collaborative research projects and clinical applications that involve sensitive genetic information.',
      category: 'general'
    },
    {
      id: 'general-3',
      question: 'How do I get started with GenomicChain?',
      answer: 'Getting started is simple: 1) Create an account on our platform, 2) Verify your identity through our secure process, 3) Upload your genomic data or connect to existing data sources, 4) Configure your access controls and permissions. Our onboarding process includes a guided tour of the platform\'s features.',
      category: 'general'
    },
    {
      id: 'security-1',
      question: 'How does GenomicChain ensure the security of my genomic data?',
      answer: 'GenomicChain employs multiple layers of security: 1) End-to-end AES-256 encryption for all data, 2) Blockchain verification for all transactions, 3) Multi-factor authentication for access control, 4) Decentralized storage to prevent single points of failure, 5) Comprehensive audit logging for all activities, and 6) Regular security audits and penetration testing.',
      category: 'security'
    },
    {
      id: 'security-2',
      question: 'What happens if there\'s a security breach?',
      answer: 'In the unlikely event of a security breach, our incident response team would immediately isolate affected systems, investigate the cause, and implement remediation measures. We would notify all affected users promptly with details about the breach and steps we\'re taking to address it. However, because all genomic data is encrypted with user-specific keys, even in a breach scenario, your actual genomic data remains encrypted and inaccessible to unauthorized parties.',
      category: 'security'
    },
    {
      id: 'privacy-1',
      question: 'Who can access my genomic data on GenomicChain?',
      answer: 'Only you and the specific individuals or organizations you explicitly grant access to can view your genomic data. Our granular access control system allows you to specify exactly what portions of your data are accessible, by whom, for how long, and for what purpose. All access attempts are logged and can be audited at any time.',
      category: 'privacy'
    },
    {
      id: 'privacy-2',
      question: 'Can GenomicChain employees access my data?',
      answer: 'No, GenomicChain employees cannot access your genomic data. The platform is designed with a zero-knowledge architecture where your data is encrypted with keys that only you control. Our employees have access to metadata needed for system operations but cannot see the content of your genomic information.',
      category: 'privacy'
    },
    {
      id: 'privacy-3',
      question: 'How does GenomicChain comply with privacy regulations like GDPR and HIPAA?',
      answer: 'GenomicChain is built from the ground up to comply with major privacy regulations. For GDPR, we provide tools for data portability, the right to be forgotten, and consent management. For HIPAA, we implement required security controls, business associate agreements, and audit trails. Our compliance team continuously monitors regulatory changes to ensure the platform remains compliant with evolving requirements.',
      category: 'privacy'
    },
    {
      id: 'technical-1',
      question: 'What blockchain technology does GenomicChain use?',
      answer: 'GenomicChain uses a private, permissioned blockchain based on Hyperledger Fabric, which provides high transaction throughput, privacy controls, and low environmental impact compared to proof-of-work blockchains. This blockchain records metadata about all data transactions while the actual genomic data is stored in encrypted form in our secure storage infrastructure.',
      category: 'technical'
    },
    {
      id: 'technical-2',
      question: 'Can I integrate GenomicChain with my existing systems?',
      answer: 'Yes, GenomicChain provides comprehensive APIs and integration options for connecting with existing systems like LIMS (Laboratory Information Management Systems), EHRs (Electronic Health Records), and research databases. Our integration team can provide guidance and support for custom integrations specific to your organization\'s needs.',
      category: 'technical'
    },
    {
      id: 'technical-3',
      question: 'What genomic data formats are supported?',
      answer: 'GenomicChain supports all major genomic data formats including FASTQ, BAM, VCF, and CRAM files. The platform also accommodates associated metadata and annotations. If you have specific format requirements, our team can work with you to ensure compatibility.',
      category: 'technical'
    },
    {
      id: 'pricing-1',
      question: 'How much does GenomicChain cost?',
      answer: 'GenomicChain offers several pricing tiers to accommodate different needs: Basic ($9.99/month) for individuals, Professional ($29.99/month) for healthcare providers and small research teams, and Enterprise (custom pricing) for large organizations. Visit our pricing page for detailed information about what\'s included in each plan and volume discounts.',
      category: 'pricing'
    },
    {
      id: 'pricing-2',
      question: 'Is there a free trial available?',
      answer: 'Yes, we offer a 14-day free trial for our Basic and Professional plans, allowing you to explore the platform\'s features and functionality. No credit card is required to start your trial, and you can upgrade to a paid plan at any time.',
      category: 'pricing'
    },
    {
      id: 'pricing-3',
      question: 'Are there any hidden fees or charges?',
      answer: 'No, there are no hidden fees with GenomicChain. All costs are transparently communicated on our pricing page. Your subscription includes the storage volume indicated in your plan, and we provide clear information about any potential additional costs for exceeding storage limits or using premium features.',
      category: 'pricing'
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedIds(prevIds => 
      prevIds.includes(id) 
        ? prevIds.filter(prevId => prevId !== id) 
        : [...prevIds, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories: { id: FAQCategory; label: string }[] = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'technical', label: 'Technical' },
    { id: 'pricing', label: 'Pricing' },
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
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about GenomicChain's blockchain-based DNA storage platform.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-dna-blue focus:border-transparent outline-none"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-dna-blue text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto mb-16">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <motion.div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <div className="text-dna-blue ml-4">
                      {expandedIds.includes(faq.id) ? (
                        <FiChevronUp className="h-5 w-5" />
                      ) : (
                        <FiChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedIds.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                No FAQs found matching your search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-dna-blue font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        
        {/* Still Have Questions */}
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-dna-blue/10 to-dna-green/10 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help. Contact us for personalized support.
          </p>
          <Link 
            href="/contact" 
            className="dna-button inline-flex items-center text-white py-3 px-8 rounded-md text-lg font-medium"
          >
            Contact Support <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
        
        {/* Related Resources */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Related Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/security" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-dna-blue/10 flex items-center justify-center mb-4">
                  <FiLock className="h-6 w-6 text-dna-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Security Information</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Learn about our multi-layered security approach and blockchain verification.</p>
              </div>
            </Link>
            
            <Link href="/pricing" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-dna-green/10 flex items-center justify-center mb-4">
                  <span className="text-dna-green font-bold">$</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Pricing Plans</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Explore our flexible pricing options for individuals and organizations.</p>
              </div>
            </Link>
            
            <Link href="/about" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-bold">🧬</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">About GenomicChain</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Discover our mission, team, and the story behind our platform.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 