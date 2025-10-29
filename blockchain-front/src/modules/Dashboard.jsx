export default function Dashboard() {
    return (
        <section className="p-10 bg-[var(--color-background)] min-h-screen">
            <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-8 text-center">
                Tu Impacto Ambiental 🌿
            </h2>

            <div className="grid grid-cols-3 gap-8 mb-12">
                {[
                    { label: "Tokens CO₂ emitidos", value: "120", color: "primary" },
                    { label: "CO₂ capturado (t)", value: "340", color: "secondary" },
                    { label: "Valor estimado (USD)", value: "$1,200", color: "primary" },
                ].map((card, idx) => (
                    <div
                        key={idx}
                        className={`bg-[var(--color-surface)] shadow-lg rounded-2xl p-8 text-center border-t-8 border-[var(--color-${card.color})]`}
                    >
                        <p className="text-[var(--color-text-light)]">{card.label}</p>
                        <h3 className="text-4xl font-bold text-[var(--color-${card.color})] mt-2">
                            {card.value}
                        </h3>
                    </div>
                ))}
            </div>

            <div className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-semibold text-[var(--color-secondary)] mb-4">
                    Historial de transacciones
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[var(--color-secondary-light)] text-[var(--color-secondary)]">
                            <tr>
                                <th className="p-3">Fecha</th>
                                <th className="p-3">Acción</th>
                                <th className="p-3">Cantidad</th>
                                <th className="p-3">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[var(--color-border)] hover:bg-[var(--color-background)]">
                                <td className="p-3">2025-10-28</td>
                                <td className="p-3">Emisión</td>
                                <td className="p-3 text-[var(--color-primary)]">+3 CO₂</td>
                                <td className="p-3 text-[var(--color-success)] font-semibold">Confirmado</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
