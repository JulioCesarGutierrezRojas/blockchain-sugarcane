export default function RegisterForm() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-10">
      <div className="bg-[var(--color-surface)] rounded-3xl shadow-2xl p-10 max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
          Registra tu cultivo 🌱
        </h2>

        <form className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[var(--color-text-light)] text-sm">Superficie (ha)</label>
            <input type="number" className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="Ej. 10" />
          </div>
          <div>
            <label className="text-[var(--color-text-light)] text-sm">Ubicación</label>
            <input type="text" className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]" placeholder="Ej. Veracruz, MX" />
          </div>
          <div className="col-span-2">
            <label className="text-[var(--color-text-light)] text-sm">Fecha de siembra</label>
            <input type="date" className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)]" />
          </div>
        </form>

        <div className="text-center mt-10">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white px-8 py-3 rounded-xl text-lg shadow-md">
            Calcular CO₂ Capturado
          </button>
        </div>
      </div>
    </div>
  );
}
