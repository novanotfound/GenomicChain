'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const runAnimation = keyframes`
  to {
    transform: none;
  }
`;

const DnaContainer = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '400px'};
  perspective: 600px;
  transform-style: preserve-3d;
  margin: 0 auto;
  transform: rotateZ(90deg);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ElementWrapper = styled.div<{ delay: number }>`
  width: 1px;
  height: 20%;
  float: left;
  margin: 0 5px; /* Reduced from 8px to 4px to make strands less wide */
  border-left: 1px #B0B0B0 dashed;
  position: relative;
  transform: rotateX(-360deg);
  animation: ${runAnimation} 4s linear infinite; /* Slowed from 2s to 4s */
  animation-delay: ${(props) => props.delay}s;
  
  &:before,
  &:after {
    content: '';
    width: 8px; /* Reduced from 10px to 8px */
    height: 8px; /* Reduced from 10px to 8px */
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
  &:before {
    top: -2px;
    background: var(--dot-color2, #000);
  }
  
  &:after {
    bottom: -2px;
    background: var(--dot-color1, deepskyblue);
  }
`;

interface DnaAnimationProps {
  width?: string;
  height?: string;
  strands?: number;
  primaryColor?: string;
  secondaryColor?: string;
  className?: string;
}

const DnaAnimation: React.FC<DnaAnimationProps> = ({
  width = '100px', // Reduced default width from 200px to 100px
  height = '400px',
  strands = 30,
  primaryColor = 'deepskyblue',
  secondaryColor = '#000',
  className,
}) => {
  const elements = Array.from({ length: strands }, (_, i) => i);
  const animationDuration = 7; // Increased from 3s to 5s for slower animation
  
  return (
    <motion.div
      className={`flex items-center justify-center ${className || ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ width: '100%', height: '100%' }}
    >
      <style jsx global>{`
        :root {
          --dot-color1: ${primaryColor};
          --dot-color2: ${secondaryColor};
        }
      `}</style>
      
      <DnaContainer width={width} height={height}>
        {elements.map((i) => (
          <ElementWrapper 
            key={i} 
            delay={(animationDuration / strands) * i * -1}
          />
        ))}
      </DnaContainer>
    </motion.div>
  );
};

export default DnaAnimation;
