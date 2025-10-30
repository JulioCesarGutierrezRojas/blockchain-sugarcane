import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Hola ${result.user.first_name}`,
          timer: 2000,
          showConfirmButton: false
        });
        
        navigate("/dashboard");
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: result.error || 'Credenciales inválidas'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-primary-light)] via-[var(--color-background)] to-[var(--color-secondary-light)] p-6">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">Iniciar sesión</h2>
        <p className="text-[var(--color-text-light)] mb-8">
          Ingresa tu email y contraseña para continuar
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`font-semibold px-8 py-3 rounded-xl text-lg shadow-md transition-transform ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white transform hover:scale-105'
            }`}
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-sm text-[var(--color-text-light)] mt-6">
          ¿No tienes cuenta?{" "}
          <a href="/registro-usuario" className="text-[var(--color-secondary)] hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </section>
  );
}
