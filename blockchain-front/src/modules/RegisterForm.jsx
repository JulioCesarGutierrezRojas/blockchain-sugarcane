export default function RegisterForm() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col items-center justify-center p-10">
      <div className="bg-[var(--color-surface)] rounded-3xl shadow-2xl p-10 max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
          Registra tu cultivo 🌱
        </h2>

        <form className="grid grid-cols-2 gap-6">
          {/* farm_id */}
          <div>
            <label className="text-[var(--color-text-light)] text-sm">ID de Granja</label>
            <input
              type="number"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Ej. 1"
            />
          </div>

          {/* Ubicación (opcional, no la pide back, pero podemos dejarla) */}
          <div>
            <label className="text-[var(--color-text-light)] text-sm">Ubicación</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="Ej. Veracruz, MX"
            />
          </div>

          {/* Fecha de cálculo */}
          <div className="col-span-2">
            <label className="text-[var(--color-text-light)] text-sm">Fecha de siembra / cálculo</label>
            <input
              type="date"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)]"
            />
          </div>

          {/* Superficie */}
          <div>
            <label className="text-[var(--color-text-light)] text-sm">Superficie (ha)</label>
            <input
              type="number"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)]"
              placeholder="Ej. 10"
            />
          </div>

          {/* CO₂ capturado */}
          <div>
            <label className="text-[var(--color-text-light)] text-sm">CO₂ Capturado (tons)</label>
            <input
              type="number"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)]"
              placeholder="Ej. 5.25"
            />
          </div>

          {/* Método de cálculo */}
          <div className="col-span-2">
            <label className="text-[var(--color-text-light)] text-sm">Método de cálculo</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)]"
              placeholder="Ej. Fotosíntesis"
            />
          </div>

          {/* Stellar Transaction Hash */}
          <div className="col-span-2">
            <label className="text-[var(--color-text-light)] text-sm">Hash de transacción (opcional)</label>
            <input
              type="text"
              className="w-full mt-1 p-3 border rounded-lg border-[var(--color-border)]"
              placeholder="Ej. abcd1234ef5678..."
            />
          </div>
        </form>

        <div className="text-center mt-10">
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white px-8 py-3 rounded-xl text-lg shadow-md">
            Guardar Registro
          </button>
        </div>
      </div>
    </div>
  );
}
