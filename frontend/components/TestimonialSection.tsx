'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    quote: "GenomicChain has revolutionized how we manage patient genomic data. The security is unmatched, and the access control features allow us to collaborate with researchers while maintaining strict privacy controls.",
    name: "Dr. Emily Chen",
    title: "Chief Genomics Officer, Medical Research Institute",
    avatar: "/placeholders/avatar-1.jpg",
  },
  {
    id: 2,
    quote: "As a patient with rare genetic markers, I've always been concerned about the security of my DNA data. GenomicChain gives me complete control over who can access my information, with a transparent blockchain record of every access request.",
    name: "Michael Rodriguez",
    title: "Patient Advocate",
    avatar: "/placeholders/avatar-2.jpg",
  },
  {
    id: 3,
    quote: "Implementing GenomicChain has accelerated our research while strengthening our compliance with data protection regulations. The blockchain verification system ensures data integrity that regulatory bodies trust.",
    name: "Sarah Johnson, PhD",
    title: "Director of Genetic Research, BioTech Innovations",
    avatar: "/placeholders/avatar-3.jpg",
  },
];

const TestimonialSection = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* DNA Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-dna-blue rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute bg-dna-green rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.5 + 0.3,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-dna-blue to-dna-green mx-auto"
            initial={{ width: 0 }}
            animate={{ width: '5rem' }}
            transition={{ duration: 0.6 }}
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-xl p-8 md:p-12">
            {/* DNA Strand Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M 50,0 Q 80,50 50,100"
                  fill="none"
                  stroke="url(#testimonialGradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="testimonialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3490dc" />
                    <stop offset="100%" stopColor="#38a169" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: index === current ? 1 : 0,
                    x: index === current ? 0 : index < current ? -100 : 100,
                    zIndex: index === current ? 1 : 0,
                    position: index === current ? 'relative' : 'absolute',
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    display: Math.abs(index - current) <= 1 ? 'flex' : 'none'
                  }}
                >
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-dna-blue to-dna-green text-white text-xl font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-dna-blue to-dna-green rounded-full" />
                  </div>
                  
                  <blockquote className="text-xl italic text-gray-700 dark:text-gray-300 mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setCurrent(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-gradient-to-r from-dna-blue to-dna-green w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-dna-blue"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-dna-green"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 