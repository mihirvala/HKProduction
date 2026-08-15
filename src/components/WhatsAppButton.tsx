import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton: React.FC = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'm interested in your photography services");
    window.open(`https://wa.me/917778979768?text=${message}`, '_blank', 'noopener');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.4 }}
      onClick={openWhatsApp}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:brightness-95 transition"
      aria-label="Contact us on WhatsApp"
    >
      <i className="fab fa-whatsapp text-2xl" />
    </motion.button>
  );
};

export default WhatsAppButton;
