
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

// onSetPassword prop is kept for potential future use (e.g. "Change Password" button within this modal)
// but the "Establece una contraseña" part is removed as it's no longer for initial setup.
const AdminPasswordModal = ({ isOpen, onClose, onPasswordSubmit, isPasswordProtected, onSetPassword }) => {
  const [passwordInput, setPasswordInput] = useState('');
  // const { toast } = useToast(); // Toast is handled by parent component now

  const handleSubmit = () => {
    // The logic for setting a new password initially is removed.
    // This modal is now only for entering an existing password.
    // If `onSetPassword` is ever used, it would be for *changing* an existing password.
    onPasswordSubmit(passwordInput);
    setPasswordInput('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { onClose(); setPasswordInput(''); } }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Acceso de Administrador</DialogTitle>
          <DialogDescription>
            Ingresa la contraseña para acceder al modo administrador.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Label htmlFor="admin-password-modal">Contraseña</Label>
          <Input 
            id="admin-password-modal" 
            type="password" 
            value={passwordInput} 
            onChange={(e) => setPasswordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => { onClose(); setPasswordInput(''); }}>Cancelar</Button>
          <Button onClick={handleSubmit}>
            Ingresar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPasswordModal;
  