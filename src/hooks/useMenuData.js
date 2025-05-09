
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { DAYS_OF_WEEK, LOCAL_STORAGE_KEY, ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD } from '@/config/constants';

const initialMenuData = DAYS_OF_WEEK.reduce((acc, day) => {
  acc[day] = [];
  return acc;
}, {});

export function useMenuData() {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [adminPassword, setAdminPassword] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);

  useEffect(() => {
    let storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!storedPassword) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
      storedPassword = DEFAULT_ADMIN_PASSWORD;
      // Silent default password set, no toast for initial setup
    }
    setAdminPassword(storedPassword);
    setIsPasswordProtected(true);
    
    const storedMenu = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedMenu) {
      try {
        const parsedMenu = JSON.parse(storedMenu);
        const completeMenu = DAYS_OF_WEEK.reduce((acc, day) => {
          acc[day] = (parsedMenu[day] || []).map(dish => ({
            ...dish,
            id: dish.id || Date.now().toString() + Math.random(), // Ensure ID exists
            images: dish.images && dish.images.length === 2 ? dish.images : ['', ''] // Ensure images is array of 2
          }));
          return acc;
        }, {});
        setMenuData(completeMenu);
      } catch (error) {
        console.error("Error parsing menu data from localStorage:", error);
        setMenuData(initialMenuData);
        toast({
          title: "Error al cargar datos",
          description: "No se pudieron cargar los datos del menú guardado. Se usará un menú vacío.",
          variant: "destructive",
        });
      }
    } else {
      setMenuData(initialMenuData);
    }
    setIsLoading(false);
  }, [toast]);

  const saveMenu = useCallback(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(menuData));
      toast({
        title: "¡Menú Guardado!",
        description: "Los cambios en el menú han sido guardados exitosamente.",
        className: "bg-green-500 text-white",
      });
    } catch (error) {
      console.error("Error saving menu data to localStorage:", error);
      toast({
        title: "Error al Guardar",
        description: "No se pudieron guardar los cambios en el menú.",
        variant: "destructive",
      });
    }
  }, [menuData, toast]);

  const handleSetPassword = (newPassword) => {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    setAdminPassword(newPassword);
    setIsPasswordProtected(true);
    // No toast on password set, to make it more discreet
  };

  const addDish = (day, dish) => {
    const newMenuData = { ...menuData };
    const dishWithId = { 
      ...dish, 
      id: Date.now().toString() + Math.random(), 
      price: parseFloat(dish.price) || 0, 
      images: dish.images && dish.images.length === 2 ? dish.images : ['', '']
    };
    newMenuData[day].push(dishWithId);
    setMenuData(newMenuData);
  };

  const updateDish = (day, index, updatedDish) => {
    const newMenuData = { ...menuData };
    newMenuData[day][index] = { 
      ...updatedDish, 
      price: parseFloat(updatedDish.price) || 0, 
      images: updatedDish.images && updatedDish.images.length === 2 ? updatedDish.images : ['', '']
    };
    setMenuData(newMenuData);
  };

  const deleteDish = (day, index) => {
    const newMenuData = { ...menuData };
    newMenuData[day].splice(index, 1);
    setMenuData(newMenuData);
    toast({
      title: "Plato Eliminado",
      description: "El plato ha sido eliminado del menú.",
      className: "bg-orange-500 text-white",
    });
  };

  return {
    menuData,
    setMenuData,
    isLoading,
    saveMenu,
    addDish,
    updateDish,
    deleteDish,
    adminPassword,
    isPasswordProtected,
    handleSetPassword,
    setIsPasswordProtected, 
    setAdminPassword
  };
}
  