import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import WalletButton from './WalletButton';
import { LogOut, User } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      await logout();
      navigate('/');
    }
  };

  return (
    <nav className="h-22 flex justify-between items-center p-4 bg-accent text-light shadow-md">
      <h1 className="text-2xl font-bold">Token CO₂ Caña</h1>
      
      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <div className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4" />
            <span>Hola, {user?.first_name}</span>
          </div>
        )}
        
        {/* Always show WalletButton when authenticated */}
        {isAuthenticated && <WalletButton />}
        
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors duration-200"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Salir
          </button>
        )}
      </div>
    </nav>
  );
}
