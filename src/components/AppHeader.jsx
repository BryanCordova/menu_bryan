
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="mb-10 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
        className="inline-block p-3 bg-primary/10 rounded-full mb-4 shadow-md"
      >
        <Utensils className="h-10 w-10 text-primary" />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-extrabold text-foreground pb-1"
      >
        Menú Semanal Comunitario
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-muted-foreground text-lg md:text-xl"
      >
        ¡Platos preparados con cariño para cada día!
      </motion.p>
    </header>
  );
};

export default AppHeader;
  