
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Save, Settings, XCircle } from 'lucide-react';

const AdminControls = ({ isAdminMode, onSaveMenu, onToggleAdminMode }) => {
  return (
    <>
      {isAdminMode && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50"
        >
          <Button onClick={onSaveMenu} size="lg" className="bg-gradient-to-r from-primary to-orange-400 hover:from-primary/90 hover:to-orange-400/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <Save className="mr-2 h-5 w-5" /> GUARDAR CAMBIOS
          </Button>
        </motion.div>
      )}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: isAdminMode ? 0 : 0.5 }}
        whileHover={{ scale: 1.15, rotate: isAdminMode ? 15 : -15 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={onToggleAdminMode}
          variant={isAdminMode ? "destructive" : "secondary"}
          size="icon"
          className="rounded-full shadow-xl w-12 h-12 p-0 hover:shadow-2xl transition-all duration-300"
          aria-label={isAdminMode ? "Salir Modo Admin" : "Modo Admin"}
        >
          {isAdminMode ? <XCircle size={24} /> : <Settings size={24} />}
        </Button>
      </motion.div>
    </>
  );
};

export default AdminControls;
  