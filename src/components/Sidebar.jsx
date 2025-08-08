import React from "react";
import {
  Home,
  PieChart,
  MessageSquare,
  Settings,
  LogOut,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  X,
} from "lucide-react";
import { useBackButton } from "../hooks/useBackButton";

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
      <aside className="fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-50 w-64">
        <div className="flex flex-col h-full p-6">
          <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 ms-auto"
            >
              <X className="w-6 h-6" />
          </button>

          <div className="mt-3 text-center">
            <div className="w-30 h-30">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center mx-auto">
                <img src="/Pizza-steve-logo-2.png" alt="Logo" className="w-20 h-20 object-contain mx-auto scale-105" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-orange-500 mt-3">Pizzas Steve</h1>
          </div>

          <div className="mb-3">
            <p className="text-gray-600 mt-3">
              Deliciosas pizzas a tu puerta o podes retirar por nuestro local en
              <span className="font-semibold"> Villegas 64 (Gral. Roca)</span>
            </p>
          </div>

          <div className="mt-4 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Contáctanos</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>2984-655294</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <p>
                
                  <a
                    href="https://www.instagram.com/pizzasteve.20/"
                    target="_blank"
                  >
                    @pizzasteve.20
                  </a>
                </p>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Síguenos</h2>
            <div className="flex space-x-4 mt-3">
              <Facebook className="w-8 h-8 text-blue-600 cursor-pointer" />
              <Instagram className="w-8 h-8 text-orange-500 cursor-pointer" />
            </div>
          </div>

          {/* <button
            onClick={onClose}
            className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300"
          >
            Ordenar ahora
          </button> */}
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
