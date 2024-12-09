import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Pizza Delivery App is your go-to platform for ordering delicious pizzas and more. We strive to provide the best food delivery experience.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: info@pizzadelivery.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Address: 123 Pizza Street, Foodville, FD 12345</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-orange-500"><Facebook /></a>
              <a href="#" className="text-white hover:text-orange-500"><Twitter /></a>
              <a href="#" className="text-white hover:text-orange-500"><Instagram /></a>
              <a href="#" className="text-white hover:text-orange-500"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; 2023 Pizza Delivery App. All rights reserved.</p>
          <p className="mt-2">Developed by John Doe</p>
        </div>
      </div>
    </footer>
  );
}

