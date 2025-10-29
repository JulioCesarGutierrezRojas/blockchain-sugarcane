export default function CO2Result() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[var(--color-background)] to-[var(--color-primary-light)] p-8 text-center">
      <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6">
        Resultado del Cálculo 🌍
      </h2>
      <div className="relative w-60 h-60 mb-6">
        <div className="absolute inset-0 rounded-full bg-[var(--color-success-bg)]"></div>
        <div className="absolute inset-[15px] rounded-full bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-primary)] text-5xl font-bold">
          3.5 t
        </div>
      </div>
      <p className="text-[var(--color-text-light)] text-lg mb-6">
        Toneladas de CO₂ capturadas por tu cultivo
      </p>
      <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] text-white px-8 py-3 rounded-xl text-lg shadow">
        Continuar al Panel
      </button>
    </div>
  );
}
