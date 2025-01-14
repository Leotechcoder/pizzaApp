

export function PromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-lg mb-6">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          filter: "brightness(50%)"
        }}
      ></div>
      <div className="relative z-10 px-6 py-12 md:py-20 text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Delicious Pizza, Delivered Fast!</h2>
        <p className="text-xl md:text-2xl mb-6">Get 20% off on your first order with code: NEWCUSTOMER</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
          Order Now
        </button>
      </div>
    </div>
  );
}

