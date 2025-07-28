import React from 'react';
import { Home, PieChart, MessageSquare, Settings, LogOut, Phone, Mail, Facebook, Twitter, Instagram, X } from 'lucide-react';
import { useBackButton } from '../hooks/useBackButton';

const SidebarItem = ({ icon: Icon, label }) => (
  <li className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-pink-50 hover:text-pink-600 transition-all duration-300">
    <Icon className="w-5 h-5 mr-3" />
    <span>{label}</span>
  </li>
);

export function Sidebar({ isOpen, onClose }) {
  useBackButton(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <>
      <aside 
        className="fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40 w-64"
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-orange-500">Pizza App</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 mt-2">Deliciosas pizzas a tu puerta</p>
          </div>
          
          {/* <nav className="flex-grow">
            <ul className="space-y-2">
              <SidebarItem icon={Home} label="Inicio" />
              <SidebarItem icon={PieChart} label="Historial de Pedidos" />
              <SidebarItem icon={MessageSquare} label="Mensajes" />
              <SidebarItem icon={Settings} label="Configuración" />
            </ul>
          </nav> */}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Contáctanos</h2>
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
            <h2 className="text-lg font-semibold mb-2">Síguenos</h2>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-blue-600 cursor-pointer" />
              <Twitter className="w-6 h-6 text-blue-400 cursor-pointer" />
              <Instagram className="w-6 h-6 text-orange-500 cursor-pointer" />
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Cerrar Sesión
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

