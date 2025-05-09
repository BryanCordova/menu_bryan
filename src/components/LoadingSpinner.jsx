
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity:0, scale: 0.5 }}
        animate={{ opacity:1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative flex items-center justify-center mb-6"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
          className="absolute w-24 h-24 border-4 border-t-primary border-r-primary/50 border-b-primary/30 border-l-transparent rounded-full"
        />
        <Utensils className="h-12 w-12 text-primary" />
      </motion.div>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl font-semibold text-foreground"
      >
        Cargando el menú...
      </motion.p>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="text-muted-foreground mt-1"
      >
        Un momento por favor.
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
  