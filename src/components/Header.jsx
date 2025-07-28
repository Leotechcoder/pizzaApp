
import { Heart, Search, Menu } from 'lucide-react';
import { Logo } from './Logo';

export function Header({ onOpenSidebar, userAvatarUrl, onOpenFavorites, onOpenSearch }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <Logo />
      {/* <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 flex-grow max-w-md mx-4">
        <input
          type="search"
          placeholder="Search"
          className="bg-transparent outline-none w-full"
          onClick={onOpenSearch}
        />
      </div> */}
      <div className="flex items-center gap-4">
        <div className="">
          <Search className="w-5 h-5 text-gray-500 cursor-pointer" onClick={onOpenSearch} />
        </div>
        {/* <Heart 
          className="w-5 h-5 text-gray-500 cursor-pointer" 
          onClick={onOpenFavorites}
        /> */}
        <button onClick={onOpenSidebar} className="focus:outline-none">
          {/* <Avatar className="w-10 h-10">
            <AvatarImage src={userAvatarUrl} alt="User avatar" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar> */}
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}

