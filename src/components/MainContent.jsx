
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AdminPasswordModal from '@/components/AdminPasswordModal';
import EditDishModal from '@/components/EditDishModal';
import MenuDisplay from '@/components/MenuDisplay';
import AdminControls from '@/components/AdminControls';

import { DAYS_OF_WEEK } from '@/config/constants';

const MainContent = ({ menuContext }) => {
  const { 
    menuData, 
    saveMenu, 
    addDish: addDishToData, 
    updateDish: updateDishInData, 
    deleteDish: deleteDishFromData,
    adminPassword,
    isPasswordProtected,
    handleSetPassword,
  } = menuContext;

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [currentDay, setCurrentDay] = useState(DAYS_OF_WEEK[new Date().getDay() === 0 ? 6 : new Date().getDay() -1]); // Default to current day
  const { toast } = useToast();

  const [editDishModalData, setEditDishModalData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const handleAdminToggle = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      if (isPasswordProtected) {
        setShowPasswordPrompt(true);
      } else {
        setIsAdminMode(true); 
      }
    }
  };

  const handlePasswordSubmit = (passwordInput) => {
    if (passwordInput === adminPassword) {
      setIsAdminMode(true);
      setShowPasswordPrompt(false);
      toast({ title: "Acceso concedido", description: "Modo administrador activado.", className: "bg-green-500 text-white" });
    } else {
      toast({ title: "Contraseña incorrecta", variant: "destructive" });
    }
  };
  
  const openAddDishModal = (day) => {
    setEditDishModalData({ day, dish: { id: Date.now().toString(), name: '', price: '', images: ['', ''] }, index: -1 });
    setIsEditModalOpen(true);
  };

  const openEditDishModal = (day, dish, index) => {
    setEditDishModalData({ day, dish, index });
    setIsEditModalOpen(true);
  };

  const handleSaveDish = (dishToSave) => {
    const { day, dish, index } = dishToSave;
    if (index === -1) { 
      addDishToData(day, dish);
    } else { 
      updateDishInData(day, index, dish);
    }
    setIsEditModalOpen(false);
    setEditDishModalData(null);
    toast({
      title: index === -1 ? "Plato Añadido" : "Plato Actualizado",
      description: `El plato "${dish.name}" ha sido ${index === -1 ? 'añadido' : 'actualizado'} con éxito.`,
      className: "bg-green-500 text-white",
    });
  };

  return (
    <main className="flex-grow w-full max-w-5xl mx-auto">
      <Tabs value={currentDay} onValueChange={setCurrentDay} className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-8 p-1.5 rounded-xl">
          {DAYS_OF_WEEK.map((day) => (
            <TabsTrigger 
              key={day} 
              value={day}
            >
              {day}
            </TabsTrigger>
          ))}
        </TabsList>
        <AnimatePresence mode="wait">
          {DAYS_OF_WEEK.map((day) => (
            currentDay === day && (
              <TabsContent key={day} value={day} asChild>
                <MenuDisplay
                  day={day}
                  dishes={menuData[day]}
                  isAdminMode={isAdminMode}
                  onAddDish={openAddDishModal}
                  onEditDish={openEditDishModal}
                  onDeleteDish={deleteDishFromData}
                />
              </TabsContent>
            )
          ))}
        </AnimatePresence>
      </Tabs>
      
      <AdminControls 
        isAdminMode={isAdminMode}
        onSaveMenu={saveMenu}
        onToggleAdminMode={handleAdminToggle}
      />

      <AdminPasswordModal 
        isOpen={showPasswordPrompt}
        onClose={() => setShowPasswordPrompt(false)}
        onPasswordSubmit={handlePasswordSubmit}
        isPasswordProtected={isPasswordProtected}
        onSetPassword={handleSetPassword} 
      />
      
      <EditDishModal 
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setEditDishModalData(null); }}
        dishData={editDishModalData}
        onSave={handleSaveDish}
      />
    </main>
  );
};

export default MainContent;
  