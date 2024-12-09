import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Logo } from './Logo';
import { SearchIcon } from './SearchIcon';
import { SearchModal } from './SearchModal';

export function Header({ onOpenSidebar, userAvatarUrl }) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm ">
      <Logo />
      <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 flex-grow max-w-md mx-4">
        <input
          type="search"
          placeholder="Search"
          className="bg-transparent outline-none w-full"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <SearchIcon onClick={() => setIsSearchModalOpen(true)} />
        </div>
        <Bell className="w-5 h-5 text-gray-500" />
        <button onClick={onOpenSidebar} className="focus:outline-none">
          <Avatar className="w-10 h-10">
            <AvatarImage src={userAvatarUrl} alt="User avatar" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        </button>
      </div>
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </header>
  );
}

