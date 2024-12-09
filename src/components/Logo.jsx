export function Logo() {
    return (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold">P</span>
        </div>
        <span className="ml-2 text-xl font-bold text-orange-500 hidden sm:inline">PizzaApp</span>
      </div>
    );
  }
  