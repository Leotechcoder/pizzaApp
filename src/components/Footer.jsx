import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Pizzas Steve</h3>
            <p className="text-gray-400">Deliciosas pizzas con delivery a tu puerta</p>
          </div>
          {/* <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
            </ul>
          </div> */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contactanos</h4>
            <p className="mb-2">Villegas 64</p>
            <p className="mb-2">General Roca, Río Negro</p>
            <p className="mb-2">Telefono: (298) 465-5294</p>
            <p>Consultas: @pizzasteve.20</p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Siguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-500 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/pizzasteve.20/" className="text-white hover:text-orange-500 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2023 LeoTechCoder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

