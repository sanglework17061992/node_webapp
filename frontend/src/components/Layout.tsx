'use client';

import { ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const [isPublicRoute, setIsPublicRoute] = useState(false);
  
  useEffect(() => {
    const publicRoutes = ['/login', '/register', '/'];
    setIsPublicRoute(publicRoutes.includes(pathname));
  }, [pathname]);

  if (isPublicRoute) {
    return <div>{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
