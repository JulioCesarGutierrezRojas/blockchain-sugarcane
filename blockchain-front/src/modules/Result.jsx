export default function CO2Result() {
  const calculation = {
    calculation_date: "2025-10-29",
    hectares_measured: 10.5,
    co2_captured_tons: 35.2721,
    calculation_method: "modelo fotosintético",
    verification_status: "Activo",
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[var(--color-background)] to-[var(--color-primary-light)] p-8 text-center">
      <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">
        Resultado de Cálculo
      </h2>

      <div className="bg-[var(--color-surface)] rounded-3xl shadow-2xl p-10 w-full max-w-lg text-left">
        <p className="text-[var(--color-text-light)] mb-2">
          Fecha de cálculo:
        </p>
        <h3 className="text-xl mb-4 font-semibold">
          {calculation.calculation_date}
        </h3>

        <p className="text-[var(--color-text-light)] mb-1">Hectáreas medidas:</p>
        <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">
          {calculation.hectares_measured} ha
        </h3>

        <p className="text-[var(--color-text-light)] mb-1">CO₂ Capturado:</p>
        <h3 className="text-5xl font-bold text-[var(--color-primary)] mb-4">
          {calculation.co2_captured_tons} t
        </h3>

        <p className="text-[var(--color-text-light)] mb-1">Método:</p>
        <p className="font-medium capitalize mb-4">
          {calculation.calculation_method}
        </p>

        <p className="text-[var(--color-text-light)] mb-1">Estatus:</p>
        <span
          className={`px-4 py-1 rounded-lg text-sm font-semibold ${calculation.verification_status === "Activo"
            ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
            : "bg-[var(--color-warning-bg)] text-[var(--color-warning)]"
            }`}
        >
          {calculation.verification_status}
        </span>
      </div>

      <button className="mt-10 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] text-white px-6 py-3 rounded-xl shadow">
        Ir al Dashboard
      </button>
    </section>
  );
}
