import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center">
      <div className="w-11 h-11 bg-orange-500 rounded-full flex items-center justify-center">
        {/* <span className="text-white text-xl font-bold">P</span> */}
        <img src="/Pizza-steve-logo-2.png" alt="Pizza Steve" className='h-10 w-10 object-contain' />
      </div>
      <span className="ml-2 text-xl font-bold text-orange-500 hidden sm:inline">Pizzas Steve</span>
    </div>
  );
}

