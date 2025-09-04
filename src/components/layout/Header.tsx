import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GitCommit, Bell, Plus, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USER } from '../../../shared/mock-data';
import { SearchPalette } from '../SearchPalette';
export const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <header className="bg-[rgb(13,17,23)] text-white border-b border-[rgb(34,39,46)] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to={`/${MOCK_USER.username}`} className="flex items-center space-x-2">
              <GitCommit className="h-8 w-8 text-[rgb(88,166,255)]" />
              <span className="font-semibold text-xl hidden sm:inline">GitGlance</span>
            </Link>
            <div className="hidden md:block">
              <Button
                variant="outline"
                className="w-64 lg:w-80 justify-start text-sm text-muted-foreground bg-transparent border-[rgb(34,39,46)] hover:bg-[rgb(34,39,46)]"
                onClick={() => setIsSearchOpen(true)}
              >
                Search or jump to...
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-[rgb(34,39,46)] bg-[rgb(13,17,23)] px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-[rgb(34,39,46)] transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-md hover:bg-[rgb(34,39,46)] transition-colors">
              <Plus className="h-5 w-5" />
            </button>
            <Link to={`/${MOCK_USER.username}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={MOCK_USER.avatarUrl} alt={MOCK_USER.username} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>
      <SearchPalette isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
    </>
  );
};