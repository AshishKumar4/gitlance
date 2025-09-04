import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(13,17,23)] text-gray-300 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};