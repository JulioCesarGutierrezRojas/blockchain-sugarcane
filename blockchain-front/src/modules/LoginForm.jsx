import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [stellarAddress, setStellarAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de login (axios/fetch)
    console.log("Stellar Address:", stellarAddress);
    console.log("Password:", password);
    navigate("/dashboard"); // Redirige a dashboard tras login
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-primary-light)] via-[var(--color-background)] to-[var(--color-secondary-light)] p-6">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">Iniciar sesión</h2>
        <p className="text-[var(--color-text-light)] mb-8">
          Ingresa tu Stellar Address y contraseña para continuar
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Stellar Address */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Stellar Address</label>
            <input
              type="text"
              value={stellarAddress}
              onChange={(e) => setStellarAddress(e.target.value)}
              placeholder="G... (56 caracteres)"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
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
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-md transition-transform transform hover:scale-105"
          >
            Iniciar sesión
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
