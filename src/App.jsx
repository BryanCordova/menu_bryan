
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useMenuData } from '@/hooks/useMenuData';
import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import LoadingSpinner from '@/components/LoadingSpinner';
import MainContent from '@/components/MainContent';

function App() {
  const menuContext = useMenuData();

  if (menuContext.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(circle_at_top_left,hsl(var(--secondary)/0.3)_0%,transparent_40%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.15)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[size:10px_10px] opacity-10 bg-[radial-gradient(circle_farthest-side_at_0_0,#FFF,transparent),radial-gradient(circle_farthest-side_at_100%_0,#FFF,transparent),radial-gradient(circle_farthest-side_at_0_100%,#FFF,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#FFF,transparent)]"></div>
      </div>
      
      <div className="flex flex-col flex-grow p-4 md:p-8 selection:bg-primary/30 selection:text-primary-foreground relative z-10">
        <AppHeader />
        <MainContent menuContext={menuContext} />
        <Toaster />
        <AppFooter />
      </div>
    </div>
  );
}

export default App;
  