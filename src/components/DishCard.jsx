import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2, ImageOff } from 'lucide-react';

const DishCard = ({ dish, day, index, isAdminMode, onEdit, onDelete }) => {
  const isValidHttpUrl = (string) => {
    if (!string) return false;
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const image1Src = dish.images && dish.images[0] && isValidHttpUrl(dish.images[0]) ? dish.images[0] : '';
  const image2Src = dish.images && dish.images[1] && isValidHttpUrl(dish.images[1]) ? dish.images[1] : '';

  const ImagePlaceholder = ({ text }) => (
    <div className="aspect-video rounded-lg border-2 border-dashed border-muted/50 flex flex-col items-center justify-center text-xs text-muted-foreground bg-muted/20 p-2">
      <ImageOff className="h-6 w-6 mb-1 text-muted-foreground/70" />
      <span>{text}</span>
    </div>
  );

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }}
      className="p-4 md:p-5 rounded-xl border bg-card/90 backdrop-blur-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1.5"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <div className="flex-grow mb-3 sm:mb-0 pr-2">
          <h3 className="text-xl md:text-2xl font-semibold text-primary">{dish.name}</h3>
          <p className="text-lg md:text-xl text-foreground/80 font-medium">S/ {dish.price ? dish.price.toFixed(2) : '0.00'}</p>
        </div>
        {isAdminMode && (
          <div className="flex space-x-2 self-start sm:self-center flex-shrink-0">
            <Button variant="outline" size="icon" onClick={() => onEdit(day, dish, index)} aria-label="Editar plato" className="border-primary/50 hover:bg-primary/10">
              <Edit3 className="h-4 w-4 text-primary" />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => onDelete(day, index)} aria-label="Eliminar plato">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {image1Src ? (
          <div className="aspect-video rounded-lg overflow-hidden border border-border/50 shadow-sm">
            <img
              alt={`Imagen 1 de ${dish.name}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              src={image1Src}
            />
          </div>
        ) : (
          dish.images && dish.images[0] && <ImagePlaceholder text="URL Imagen 1 no válida" />
        )}
        {image2Src ? (
          <div className="aspect-video rounded-lg overflow-hidden border border-border/50 shadow-sm">
            <img
              alt={`Imagen 2 de ${dish.name}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              src={image2Src}
            />
          </div>
        ) : (
          dish.images && dish.images[1] && <ImagePlaceholder text="URL Imagen 2 no válida" />
        )}
      </div>
      {!(image1Src || image2Src) && (!dish.images || (!dish.images[0] && !dish.images[1])) && (
        <div className="mt-3 text-sm text-muted-foreground text-center py-4 flex items-center justify-center">
          <ImageOff className="h-5 w-5 mr-2 text-muted-foreground/70" />
          No hay imágenes para este plato.
        </div>
      )}
    </motion.li>
  );
};

export default DishCard;