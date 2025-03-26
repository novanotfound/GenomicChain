'use client';

import { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Return a placeholder with the same height to prevent layout shift
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-2xl">Loading...</div>
    </div>;
  }

  return <>{children}</>;
};

export default ClientOnly; 