import { useEffect } from 'react';
import { AppProps } from 'next/app';
import '../globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Force a complete hydration on initial load
    document.body.style.display = 'block';
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp; 