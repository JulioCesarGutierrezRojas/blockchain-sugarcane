export default function Explorer() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] p-10">
      <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6 text-center">
        Explorador de Transacciones
      </h2>
      <div className="max-w-3xl mx-auto bg-[var(--color-surface)] shadow rounded-2xl p-6">
        <input
          type="text"
          placeholder="Buscar por hash o dirección..."
          className="w-full border border-[var(--color-border)] rounded-lg p-3 mb-6 focus:ring-2 focus:ring-[var(--color-secondary)]"
        />
        <div className="text-center text-[var(--color-text-light)] italic">
          🔍 Ingresa un hash para ver detalles de la transacción.
        </div>
      </div>
    </div>
  );
}
