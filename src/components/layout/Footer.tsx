import React from 'react';
import { GitCommit } from 'lucide-react';
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[rgb(13,17,23)] text-gray-400 border-t border-[rgb(34,39,46)] mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <GitCommit className="h-5 w-5 text-[rgb(88,166,255)]" />
          <span className="text-sm">&copy; {currentYear} GitGlance. Built with ❤️ at Cloudflare.</span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </div>
      </div>
    </footer>
  );
};