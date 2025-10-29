export default function LandingPage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-[var(--color-primary-light)] via-[var(--color-background)] to-[var(--color-secondary-light)] overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838686-6c7d5f23d7b8?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div className="z-10 max-w-3xl p-8 backdrop-blur-sm bg-white/40 rounded-3xl shadow-2xl">
        <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-4">
          Token CO₂ Caña
        </h1>
        <p className="text-lg text-[var(--color-text-light)] mb-8">
          Transforma la captura de CO₂ de tus cultivos en créditos digitales de carbono.
          Un futuro sostenible comienza en el campo. 🌿
        </p>
        <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-md">
          Comenzar
        </button>
      </div>

      <p className="absolute bottom-8 text-[var(--color-text-light)] text-sm">
        Desarrollado con Stellar + Soroban + React
      </p>
    </section>
  );
}
