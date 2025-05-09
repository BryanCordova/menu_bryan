
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Save, ImagePlus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EditDishModal = ({ isOpen, onClose, dishData, onSave }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (dishData?.dish) {
      setName(dishData.dish.name || '');
      setPrice(dishData.dish.price?.toString() || '');
      setImage1(dishData.dish.images?.[0] || '');
      setImage2(dishData.dish.images?.[1] || '');
    } else {
      setName('');
      setPrice('');
      setImage1('');
      setImage2('');
    }
  }, [dishData]);

  if (!dishData) return null;

  const { day, index } = dishData;
  const isNewDish = index === -1;

  const handleSave = () => {
    if (!name.trim()) {
      toast({ title: "Error", description: "El nombre del plato no puede estar vacío.", variant: "destructive" });
      return;
    }
    if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
        toast({ title: "Error", description: "El precio debe ser un número válido.", variant: "destructive" });
        return;
    }
    onSave({ 
      day, 
      dish: { 
        id: dishData.dish.id || Date.now().toString(), 
        name, 
        price: parseFloat(price) || 0,
        images: [image1, image2]
      }, 
      index 
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isNewDish ? 'Añadir Nuevo Plato' : 'Editar Plato'} a {day}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dish-name-modal" className="text-right">Nombre</Label>
            <Input id="dish-name-modal" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Ej: Lomo Saltado" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dish-price-modal" className="text-right">Precio (S/.)</Label>
            <Input id="dish-price-modal" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" placeholder="Ej: 25.50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dish-image1-modal" className="text-right">Imagen 1 (URL)</Label>
            <Input id="dish-image1-modal" value={image1} onChange={(e) => setImage1(e.target.value)} className="col-span-3" placeholder="URL de la imagen principal" />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dish-image2-modal" className="text-right">Imagen 2 (URL)</Label>
            <Input id="dish-image2-modal" value={image2} onChange={(e) => setImage2(e.target.value)} className="col-span-3" placeholder="URL de la imagen secundaria" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Guardar Plato</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDishModal;
  