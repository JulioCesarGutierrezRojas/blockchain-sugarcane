import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegisterForm() {
  const navigate = useNavigate();

  const [stellarAddress, setStellarAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de registro (axios/fetch)
    console.log({
      stellarAddress,
      email,
      password,
      firstName,
      lastName,
      phone,
    });
    // Al registrar, podemos redirigir al login
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[var(--color-primary-light)] via-[var(--color-background)] to-[var(--color-secondary-light)] p-6">
      <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-6">Registro de Usuario</h2>
        <p className="text-[var(--color-text-light)] mb-8">
          Crea tu cuenta para poder registrar tus cultivos y tokens de CO₂.
        </p>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">

          {/* Stellar Address */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Stellar Address *</label>
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
            <label className="text-[var(--color-text-light)] text-sm mb-1">Contraseña *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Nombre *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Apellido *</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Tu apellido"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col text-left">
            <label className="text-[var(--color-text-light)] text-sm mb-1">Teléfono</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+52 123 456 7890"
              className="w-full p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold px-8 py-3 rounded-xl text-lg shadow-md transition-transform transform hover:scale-105"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-sm text-[var(--color-text-light)] mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-[var(--color-secondary)] hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </section>
  );
}
