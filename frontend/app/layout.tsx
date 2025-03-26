import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientOnly from '@/components/ClientOnly';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenomicChain - Secure DNA Storage on Blockchain',
  description: 'A secure platform for storing and managing genomic data on blockchain technology with end-to-end encryption and granular access control.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Navbar />
          {children}
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
} 