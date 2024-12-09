import React from 'react';
import { Home, PieChart, MessageSquare, Settings, LogOut, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label }) => (
  <li className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-orange-100 hover:text-orange-500 transition-all duration-300">
    <Icon className="w-5 h-5 mr-3" />
    <span>{label}</span>
  </li>
);

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40 w-64 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-orange-500">Pizza App</h1>
            <p className="text-gray-600 mt-2">Delicious pizzas delivered to your doorstep</p>
          </div>
          
          <nav className="flex-grow">
            <ul className="space-y-2">
              <SidebarItem icon={Home} label="Home" />
              <SidebarItem icon={PieChart} label="Order History" />
              <SidebarItem icon={MessageSquare} label="Messages" />
              <SidebarItem icon={Settings} label="Settings" />
            </ul>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@pizzaapp.com</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-blue-600 cursor-pointer" />
              <Twitter className="w-6 h-6 text-blue-400 cursor-pointer" />
              <Instagram className="w-6 h-6 text-pink-600 cursor-pointer" />
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Log Out
          </button>
        </div>
      </aside>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        ></div>
      )}
    </>
  );
}

