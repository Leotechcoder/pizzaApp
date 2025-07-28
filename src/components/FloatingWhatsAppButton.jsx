import React from 'react';
import { MessageCircleMore } from 'lucide-react'; // Using a chat-like icon from lucide-react

/**
 * Componente de botón flotante de WhatsApp.
 * Al hacer clic, abre un chat de WhatsApp con un número predefinido y un mensaje.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.phoneNumber - El número de teléfono de WhatsApp (ej: '5491112345678').
 * @param {string} [props.message='Hola, me gustaría hacer una consulta.'] - El mensaje predefinido para el chat de WhatsApp.
 */
function FloatingWhatsAppButton({ phoneNumber, message = 'Hola, me gustaría hacer una consulta.' }) {
  // Codifica el mensaje para que sea seguro en la URL
  const encodedMessage = encodeURIComponent(message);

  // Construye la URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank'); // Abre el enlace en una nueva pestaña
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 z-50"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircleMore className="w-8 h-8" /> {/* Icono de mensaje */}
    </button>
  );
}

export default FloatingWhatsAppButton;