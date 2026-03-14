import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/layout/AppLayout';
import { MobileScene } from './components/mobile/MobileScene';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { useIsMobile } from './hooks/useIsMobile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), isMobile ? 1200 : 2000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}>
      {isInitialLoading ? <LoadingScreen /> : (isMobile ? <MobileScene /> : <AppLayout />)}
    </QueryClientProvider>
  );
};

export default App;
