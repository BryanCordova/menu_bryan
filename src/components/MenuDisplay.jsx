
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Coffee } from 'lucide-react';
import DishCard from '@/components/DishCard';

const MenuDisplay = ({ day, dishes, isAdminMode, onAddDish, onEditDish, onDeleteDish }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <motion.div
      key={day}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Card className="shadow-2xl glass-card border-primary/20">
        <CardHeader className="flex flex-row justify-between items-center !pb-4">
          <CardTitle className="!text-3xl md:!text-4xl">{day}</CardTitle>
          {isAdminMode && (
            <Button onClick={() => onAddDish(day)} size="lg" className="bg-gradient-to-r from-accent to-green-500 hover:from-accent/90 hover:to-green-500/90 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <PlusCircle className="mr-2 h-5 w-5" /> Añadir Plato
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {dishes && dishes.length > 0 ? (
            <motion.ul 
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {dishes.map((dish, index) => (
                  <DishCard
                    key={dish.id || index} 
                    dish={dish}
                    day={day}
                    index={index}
                    isAdminMode={isAdminMode}
                    onEdit={onEditDish}
                    onDelete={onDeleteDish}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-muted-foreground text-center py-12 flex flex-col items-center"
            >
              <Coffee className="h-16 w-16 mb-4 text-primary/50" />
              <p className="text-lg">No hay platos para {day} todavía.</p>
              {isAdminMode && <p className="text-md mt-1">¡Puedes añadir algunos usando el botón de arriba!</p>}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MenuDisplay;
  