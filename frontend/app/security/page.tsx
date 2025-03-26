'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiLock, FiShield, FiKey, FiServer, FiEye, FiFileText, FiAlertTriangle } from 'react-icons/fi';

const SecurityPage = () => {
  const securityFeatures = [
    {
      icon: <FiLock className="h-8 w-8" />,
      title: "End-to-End Encryption",
      description: "All genomic data is encrypted using industry-leading AES-256 encryption before being stored or transmitted. Only authorized users with proper keys can decrypt the data."
    },
    {
      icon: <FiShield className="h-8 w-8" />,
      title: "Blockchain Verification",
      description: "Every transaction involving genomic data is recorded on our private blockchain, creating an immutable audit trail that prevents unauthorized modifications."
    },
    {
      icon: <FiKey className="h-8 w-8" />,
      title: "Multi-Factor Authentication",
      description: "Access to sensitive genomic data requires multiple forms of verification, including something you know, something you have, and something you are."
    },
    {
      icon: <FiServer className="h-8 w-8" />,
      title: "Decentralized Storage",
      description: "Data is fragmented and stored across multiple secure nodes, ensuring no single point of failure and preventing unauthorized access even if one node is compromised."
    },
    {
      icon: <FiEye className="h-8 w-8" />,
      title: "Granular Access Controls",
      description: "Data owners can specify exactly who can access their genomic data, what portions they can access, for how long, and for what purpose."
    },
    {
      icon: <FiFileText className="h-8 w-8" />,
      title: "Comprehensive Audit Logs",
      description: "Every access attempt, successful or not, is logged with detailed information including who, when, what, and from where, providing complete transparency."
    }
  ];

  const certifications = [
    "HIPAA Compliance", 
    "GDPR Compliance", 
    "ISO 27001", 
    "SOC 2 Type II", 
    "NIST Cybersecurity Framework"
  ];

  const securityProcess = [
    {
      step: "1",
      title: "Data Encryption",
      description: "Genomic data is encrypted with user-specific keys before leaving the client device, ensuring it's never exposed in its raw form during transmission."
    },
    {
      step: "2",
      title: "Identity Verification",
      description: "Multi-factor authentication verifies the identity of users attempting to access or modify genomic data."
    },
    {
      step: "3",
      title: "Blockchain Recording",
      description: "Each transaction is packaged with metadata and recorded to our private blockchain, creating a permanent, tamper-proof record."
    },
    {
      step: "4",
      title: "Fragmented Storage",
      description: "Encrypted data is split into fragments and distributed across multiple secure storage nodes within our network."
    },
    {
      step: "5",
      title: "Access Control Enforcement",
      description: "When data is requested, the system verifies the user's identity and permissions against the blockchain record before allowing access."
    },
    {
      step: "6",
      title: "Audit Logging",
      description: "Detailed logs of all access attempts and actions are generated and securely stored for future reference and compliance purposes."
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Industry-Leading Security
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            At GenomicChain, your genomic data is protected by multiple layers of advanced security and blockchain verification. Learn how we keep your most sensitive data safe.
          </p>

          <div className="flex justify-center">
            <Link 
              href="/auth/signup" 
              className="dna-button text-white py-3 px-8 rounded-md text-lg font-medium mr-4"
            >
              Secure Your Data
            </Link>
            <Link 
              href="/contact" 
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3 px-8 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-lg font-medium"
            >
              Talk to Security Team
            </Link>
          </div>
        </motion.div>
        
        {/* Security Features */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Enterprise-Grade Security Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-dna-blue mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Security Process */}
        <div className="max-w-6xl mx-auto mb-20 bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Security Process
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-full h-full relative">
                {/* DNA security visualization */}
                <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-dna-blue/10 to-dna-green/10 rounded-full flex items-center justify-center">
                  <div className="relative w-4/5 h-4/5 rounded-full border-4 border-dashed border-dna-blue/30 animate-spin-slow flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-full border-4 border-dashed border-dna-green/30 animate-spin-slow-reverse flex items-center justify-center">
                      <div className="w-16 h-16 bg-dna-blue/20 rounded-full flex items-center justify-center">
                        <FiLock className="w-8 h-8 text-dna-blue" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-6">
              {securityProcess.map((step, index) => (
                <motion.div 
                  key={step.step}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-dna-blue text-white text-lg font-bold mr-4 flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Certifications */}
        <motion.div 
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Compliance & Certifications
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={cert}
                className="bg-white dark:bg-gray-800 py-3 px-6 rounded-full shadow-md flex items-center"
              >
                <FiCheckCircle className="w-5 h-5 text-dna-green mr-2" />
                <span className="text-gray-900 dark:text-white font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Regular Security Practices */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Regular Security Practices
          </motion.h2>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiCheckCircle className="h-5 w-5 text-dna-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Penetration Testing</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our systems undergo regular penetration testing by independent security experts to identify and address potential vulnerabilities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiCheckCircle className="h-5 w-5 text-dna-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Audits</h3>
                  <p className="text-gray-600 dark:text-gray-300">Quarterly security audits of our codebase, infrastructure, and operational procedures ensure we maintain the highest security standards.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiCheckCircle className="h-5 w-5 text-dna-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Employee Training</h3>
                  <p className="text-gray-600 dark:text-gray-300">All employees undergo comprehensive security training and regular refresher courses to ensure they follow best practices for data security.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FiCheckCircle className="h-5 w-5 text-dna-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Incident Response Plan</h3>
                  <p className="text-gray-600 dark:text-gray-300">We maintain a detailed incident response plan that is regularly tested and updated to ensure rapid and effective response to any security incidents.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Security Reporting */}
        <motion.div 
          className="max-w-4xl mx-auto text-center bg-dna-blue/10 dark:bg-dna-blue/5 rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dna-blue/20 mb-6">
            <FiAlertTriangle className="w-8 h-8 text-dna-blue" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Found a Security Vulnerability?
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            We take security seriously and appreciate responsible disclosure of security vulnerabilities. If you believe you've found a security issue, please let us know right away.
          </p>
          
          <Link 
            href="/security/vulnerability-report" 
            className="bg-dna-blue text-white py-3 px-8 rounded-md text-lg font-medium hover:bg-dna-blue/90 transition-colors"
          >
            Report a Vulnerability
          </Link>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SecurityPage; 